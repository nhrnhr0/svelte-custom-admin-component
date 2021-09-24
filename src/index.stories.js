import CustomElement from './index.svelte'

export default { title: 'CustomElement' }

export const CustomElementStory = () => ({
  Component: CustomElement,
})

export const CustomElementStoryWithProps = () => ({
  Component: CustomElement,
  props: {
    catalog_image_id: '78',
  },
})