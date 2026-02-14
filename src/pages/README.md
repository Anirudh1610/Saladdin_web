# Pages Structure

This directory contains all the main pages of the application, organized by page sections.

## Folder Structure

```
pages/
├── Home/
│   ├── Home1.js          # Hero section with bowl
│   ├── Home1.css
│   ├── Home2.js          # Second section
│   ├── Home2.css
│   └── ...               # Add Home3.js, Home4.js, etc.
│
├── Menu/
│   ├── Menu1.js          # First menu section
│   ├── Menu1.css
│   └── ...               # Add Menu2.js, Menu3.js, etc.
│
├── BuildBowl/
│   ├── BuildBowl1.js     # First build bowl section
│   ├── BuildBowl1.css
│   └── ...               # Add more sections
│
├── Subscription/
│   ├── Subscription1.js  # First subscription section
│   ├── Subscription1.css
│   └── ...               # Add more sections
│
├── Consultation/
│   ├── Consultation1.js  # First consultation section
│   ├── Consultation1.css
│   └── ...               # Add more sections
│
├── Blogs/
│   ├── Blogs1.js         # First blogs section
│   ├── Blogs1.css
│   └── ...               # Add more sections
│
├── Home.js               # Main Home page container
├── Home.css
├── SaladExplorer.js      # Main Menu page container
├── BuildYourBowl.js      # Main Build Bowl page container
├── Subscription.js       # Main Subscription page container
├── ConsultationBooking.js
├── Blogs.js              # Main Blogs page container
└── ...                   # Other main page files

```

## Naming Convention

- **Main Page Files**: `Home.js`, `SaladExplorer.js`, `BuildYourBowl.js`, etc.
  - These files import and compose all sections for that page
  
- **Section Files**: `Home1.js`, `Home2.js`, `Menu1.js`, `BuildBowl1.js`, etc.
  - Located in their respective folders
  - Each section has its own JS and CSS file
  - Numbered sequentially (1, 2, 3, etc.)

## Adding New Sections

1. Create the section file in the appropriate folder:
   ```
   pages/Home/Home3.js
   pages/Home/Home3.css
   ```

2. Import and add it to the main page file:
   ```javascript
   // In Home.js
   import Home3 from './Home/Home3';
   
   return (
     <div className="home-page-wrapper">
       <Home1 />
       <Home2 />
       <Home3 />
     </div>
   );
   ```

## Benefits

- ✅ Clear organization by page
- ✅ Easy to locate and edit specific sections
- ✅ Scalable as pages grow
- ✅ Maintainable and clean structure
- ✅ Each section is independent and reusable
