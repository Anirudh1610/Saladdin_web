# Home Page Components

This directory contains all the modular components for the Saladdin homepage, organized for maintainability and clean code structure.

## Component Structure

### 1. **HeroSection** (`HeroSection.js`, `HeroSection.css`)
The main hero section with:
- Bold headline "Bowls Built for Better Days"
- Primary CTA buttons (Order Now, Build your Bowl)
- Animated bowl image with rotating text
- Decorative floating food elements (carrot, orange, onion, etc.)
- Floating cart button

### 2. **PopularSalads** (`PopularSalads.js`, `PopularSalads.css`)
Displays trending salad bowls featuring:
- Grid layout of salad cards
- Product images with hover effects
- Star ratings and reviews
- Nutrition information (calories, protein, carbs, fat)
- Price display with add-to-cart buttons
- Vegan and Spicy badges
- "View More" CTA

### 3. **WhyChoose** (`WhyChoose.js`, `WhyChoose.css`)
Highlights the brand's value propositions:
- Mission Vegan - Stay Fit
- Premium Nutrition
- Handpicked for Max Freshness
- Clean Cut, Happy You
- Card-based layout with images and descriptions

### 4. **PremiumBanner** (`PremiumBanner.js`, `PremiumBanner.css`)
Promotional section featuring:
- Dark background with gradient
- "Get Premium and save up to 20%" message
- Subscribe Now CTA button
- Decorative food elements

### 5. **BuildBowl** (`BuildBowl.js`, `BuildBowl.css`)
Interactive bowl-building section with:
- 4-step process explanation
  - Choose Your Base
  - Add Your Mix-Ins
  - Dress Your Bowl
  - Schedule Delivery
- Icon-based step cards
- "Build Now" CTA
- Bowl showcase image

### 6. **Ingredients** (`Ingredients.js`, `Ingredients.css`)
Premium ingredients showcase on dark background:
- Protein Power
- Mix Around
- Weekend Eats
- Quality Checked
- Image cards with overlay icons

### 7. **BlogsSection** (`BlogsSection.js`, `BlogsSection.css`)
Featured blog posts section:
- Blog cards with images
- Category tags
- Read time indicators
- Excerpt text
- "View More" CTA linking to blog page

### 8. **AppDownload** (`AppDownload.js`, `AppDownload.css`)
Mobile app promotion section featuring:
- App Store and Google Play download buttons
- Phone mockups showcasing the app
- Colorful background blocks
- 15% off first order promotion

### 9. **Footer** (`Footer.js`, `Footer.css`)
Comprehensive footer with:
- Brand section with tagline "Eat Clean Everyday"
- Social media links (Facebook, Instagram, Twitter)
- Quick links (Company, Support)
- Contact information
- Copyright and legal links

## File Organization

```
Home/
├── HeroSection.js
├── HeroSection.css
├── PopularSalads.js
├── PopularSalads.css
├── WhyChoose.js
├── WhyChoose.css
├── PremiumBanner.js
├── PremiumBanner.css
├── BuildBowl.js
├── BuildBowl.css
├── Ingredients.js
├── Ingredients.css
├── BlogsSection.js
├── BlogsSection.css
├── AppDownload.js
├── AppDownload.css
├── Footer.js
└── Footer.css
```

## Main Home Component

The main `Home.js` file imports and orchestrates all sections:

```javascript
import HeroSection from './Home/HeroSection';
import PopularSalads from './Home/PopularSalads';
import WhyChoose from './Home/WhyChoose';
import PremiumBanner from './Home/PremiumBanner';
import BuildBowl from './Home/BuildBowl';
import Ingredients from './Home/Ingredients';
import BlogsSection from './Home/BlogsSection';
import AppDownload from './Home/AppDownload';
import Footer from './Home/Footer';
```

## Design Features

### Responsive Design
- All components are fully responsive
- Mobile-first approach
- Breakpoints at 768px and 1024px
- Flexible grid layouts

### Animations
- Hover effects on cards and buttons
- Floating animations for decorative elements
- Smooth transitions
- Image zoom effects

### Color Palette
- Primary Green: `#2d5f3f`
- Light Background: `#FEFFDC`
- Dark Background: `#1a1a1a`
- Accent Colors: Various pastels for sections

### Typography
- Font Family: 'Manrope', sans-serif
- Heading weights: 700-800
- Body text: 400-600

## Dependencies

- **react-router-dom**: For navigation links
- **lucide-react**: For icons throughout the components

## Usage

Simply import the `Home` component in your App routing:

```javascript
import Home from './pages/Home';

// In your routes
<Route path="/" element={<Home />} />
```

## Future Enhancements

- [ ] Add real product data from API
- [ ] Implement actual add-to-cart functionality
- [ ] Add image lazy loading
- [ ] Implement skeleton loaders
- [ ] Add testimonials section
- [ ] Create animated scroll effects
- [ ] Add newsletter signup
