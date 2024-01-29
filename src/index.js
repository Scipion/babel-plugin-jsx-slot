export default function (babel) {
  const { types: t } = babel;

  return {
    name: "babel-plugin-react-slot",
    visitor: {
      JSXAttribute(path) {
        const attrName = path.node.name.name;
        const attrValue = path.node.value.value;
        if (attrName !== "slot") {
          return;
        }

        // 1. add slotted element to parent as props
        // <Box><div slot="foo">bar</div></Box>
        // to
        // <Box __slot_foo={<div>bar</div>}></Box>
        const element = path.findParent(t.isJSXElement);
        const parentElement = element.findParent(t.isJSXElement);
        const clonedElement = t.cloneNode(element.node);
        clonedElement.openingElement.attributes =
          clonedElement.openingElement.attributes.filter(
            (e) => e.name.name !== "slot"
          );

        const slotAttribute = t.JSXAttribute(
          t.JSXIdentifier("__slot_" + attrValue),
          t.JSXExpressionContainer(clonedElement)
        );
        if (parentElement.node.openingElement.attributes) {
          parentElement.node.openingElement.attributes.push(slotAttribute);
        }
        element.remove();
      },
      JSXElement(path) {
        const openingElement = path.node.openingElement;
        const openingElementName = openingElement.name.name;
        if (openingElementName?.toLowerCase() !== "slot") {
          return;
        }

        // SLOT setup
        const slotAttrNameNode = openingElement.attributes.find(
          (attr) => attr.name.name === "name"
        );
        const slotValue = slotAttrNameNode?.value?.value;
        const slotElmenetChildren = path.node.children;

        // COMPONENT function setup
        const component = path.getFunctionParent();
        const firstParam = component.node.params[0];

        if (component.isArrowFunctionExpression()) {
          component.arrowFunctionToExpression();
        }

        // UNNAMED Element SLOT
        // {p.children} or {props.children} or {children} case
        let slotReplacementName = "children";
        if (slotAttrNameNode) {
          // NAMED Element SLOT
          // {x, y, z, ..., __slot_name} case
          slotReplacementName = "__slot_" + slotValue;
        }

        // 1. Set param to function expression
        const { firstParamId, firstParamIsId } = setParamToComponent(
          t,
          component,
          firstParam,
          slotReplacementName
        );

        // 2. Replace <slot> with {props.children} or {children} or {props.__slot_x} or {__slot_x}
        transformSlotTag(
          t,
          path,
          firstParamId,
          firstParamIsId,
          slotElmenetChildren,
          slotReplacementName
        );
      },
    },
  };
}

function setParamToComponent(t, component, firstParam, childrenName) {
  let firstParamId = t.isAssignmentPattern(firstParam)
    ? firstParam.left
    : firstParam;
  let firstParamIsId = true;
  const idChildren = t.identifier(childrenName);

  if (component.node.params.length === 0) {
    firstParamId = t.identifier("props");
    component.node.params = [t.identifier("props")];
  } else if (t.isObjectPattern(component.node.params[0])) {
    component.node.params[0].properties.push(
      t.objectProperty(
        t.cloneNode(idChildren),
        t.cloneNode(idChildren),
        false,
        true
      )
    );
    firstParamIsId = false;
  }
  return { firstParamId, firstParamIsId };
}

function transformSlotTag(
  t,
  path,
  firstParamId,
  firstParamIsId,
  slotElmenetChildren,
  propName
) {
  const getPropIdentifier = () => t.Identifier(propName);

  if (firstParamIsId) {
    if (slotElmenetChildren.length > 0) {
      //     {props.__slot_x ? props.__slot_x : <>Default content</>}
      path.replaceWith(
        t.JSXExpressionContainer(
          t.conditionalExpression(
            t.MemberExpression(t.cloneNode(firstParamId), getPropIdentifier()),
            t.MemberExpression(t.cloneNode(firstParamId), getPropIdentifier()),
            t.JSXFragment(
              t.JSXOpeningFragment(),
              t.JSXClosingFragment(),
              slotElmenetChildren
            )
          )
        )
      );
    } else {
      //     {props.__slot_x}
      path.replaceWith(
        t.JSXExpressionContainer(
          t.MemberExpression(t.cloneNode(firstParamId), getPropIdentifier())
        )
      );
    }
  } else {
    if (slotElmenetChildren.length > 0) {
      //     {__slot_x ? __slot_x : <>Default content</>}
      path.replaceWith(
        t.JSXExpressionContainer(
          t.conditionalExpression(
            getPropIdentifier(),
            getPropIdentifier(),
            t.JSXFragment(
              t.JSXOpeningFragment(),
              t.JSXClosingFragment(),
              slotElmenetChildren
            )
          )
        )
      );
    } else {
      //     {__slot_x}
      path.replaceWith(t.JSXExpressionContainer(getPropIdentifier()));
    }
  }
}
