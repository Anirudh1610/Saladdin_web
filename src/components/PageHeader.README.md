# PageHeader Component

A reusable header component for pages across the application with decorative fruit and vegetable icons.

## Usage

```jsx
import PageHeader from '../components/PageHeader';

<PageHeader 
  title="Your Page Title"
  subtitle="Your page subtitle or description"
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | string | Yes | Main heading text for the page |
| `subtitle` | string | Yes | Descriptive subtitle text |

## Examples

### Menu Page
```jsx
<PageHeader 
  title="Explore Salads"
  subtitle="Browse from our exclusive collection of salads and we will make them ready for you and deliver to your doorstep"
/>
```

### Build Your Bowl Page
```jsx
<PageHeader 
  title="Build Your Bowl"
  subtitle="Browse from our exclusive collection of salads and we will make them ready for you and deliver to your doorstep"
/>
```

### Subscription Page
```jsx
<PageHeader 
  title="Smart Meal Prep Subscription"
  subtitle="Set your health goals and receive automated weekly deliveries tailored to your needs"
/>
```

### Consultation Page
```jsx
<PageHeader 
  title="Consult a Professional"
  subtitle="Connect with our expert nutritionists to create your personalized health plan"
/>
```

### Blogs Page
```jsx
<PageHeader 
  title="Blogs & Articles"
  subtitle="Healthy, delicious bowls made fresh every day so you can feel lighter, happier, and better."
/>
```

## Styling

The component uses `PageHeader.css` for styling with a yellow background (`#FEFFDC`) and decorative fruit/vegetable icons positioned absolutely.

## Features

- Responsive design that adapts to different screen sizes
- Decorative fruit and vegetable icons
- Consistent styling across all pages
- Centered content with max-width container
