# babel-plugin-jsx-slot

Use `<slot>` tag as you would do it in Svelte or Web Components.

The pluging makes the most of jsx `{children}` param

## Install

```bash
npm install --save-dev babel-plugin-jsx-slot
```

```bash
yarn add -D babel-plugin-jsx-slot
```

```bash
pnpm add -D bable-plugin-jsx-slot
```

## Configuration

In your _babel.config.js_ add **babel-plugin-jsx-slot** in the plugins section.

```json
{
  "presets": ["@babel/env", "@babel/preset-react"],
  "plugins": ["babel-plugin-jsx-slot"]
}
```

## Usage

Create your component using the `<slot>` tag. You can wrap it in other tags and name your slots in order to sort them.

```jsx
const Card = () => (
  <div class="card">
    <slot name="header"></slot>
    <article>
      <slot name="content"></slot>
    </article>
    <p>Fix content between slots.</p>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
);
```

```jsx
const App = () => (
  <Card>
    <h1 slot="header" class="p-1">
      title
    </h1>
    <p slot="content">Content</p>
    <a slot="footer" href="#">
      Read more
    </a>
  </Card>
);
```

### Slots

Slots can have fallbacks or be self closed tags.

```jsx
<slot><!-- optional fallback --></slot>
```

```jsx
<slot name="content"><!-- optional fallback --></slot>
```

```jsx
<slot />
```

### Using a component with slots

```jsx
<Box>This content will apear in an unnamed slot</Box>
```

```jsx
<Box>
  <span slot="content">This content will apear the slot named "content"</span>
</Box>
```

## Solid.js solid/no-destructure

Due Solid.js does not supor destructuring in component arguments:

`Destructuring component props breaks Solid's reactivity; use property access instead. eslint(solid/no-destructure)`

For components without parameters, the implemetation decision is always tranform the component to have a singel argument called `props`, that will be used as `{props.children}` for unnamed slots.

If a first argument is already defined with a different name the transformation will keep the name.

If a first argument is an object pattern (as in `function({a, b, c}){...}`) the parameter children will be added to keep consistency, given that the previous recomendation is shown to the uses in dev time.

## Qwik

WIP
Qwik framework already contains `Slot` native component and it does not work with default `{children}`
