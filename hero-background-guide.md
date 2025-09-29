# Hero Background Image Guide

## Current Background Image

The homepage hero section now features a professional wedding tent setup background image that showcases the type of elegant events your business provides.

## How to Add Your Own Business Background Image

### Step 1: Prepare Your Image

**Recommended specifications:**

- **Size**: 1920px x 1080px (or larger)
- **Format**: JPG or PNG
- **Quality**: High resolution for crisp display
- **Content**: Your best tent setup, event in progress, or business location
- **File size**: Under 2MB for fast loading

### Step 2: Save Your Image

1. Save your business photo as `hero-background.jpg` in the `images` folder
2. Make sure the image shows your business in the best light

### Step 3: Update the CSS

Open `styles.css` and find the hero section around line 93.

**Replace this:**

```css
.hero {
  background: linear-gradient(
      135deg,
      rgba(44, 62, 80, 0.8),
      rgba(52, 152, 219, 0.7)
    ),
    url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
```

**With this:**

```css
.hero {
  background: linear-gradient(
      135deg,
      rgba(44, 62, 80, 0.8),
      rgba(52, 152, 219, 0.7)
    ),
    url('images/hero-background.jpg');
```

### Step 4: Alternative Images

You can also use multiple images for different sections or create a slideshow effect by adding more background images.

## Best Background Images for Your Business

### Recommended Photo Types:

1. **Wedding Reception** - Elegant white tent with guests and lighting
2. **Corporate Event** - Professional setup with branded materials
3. **Festival/Large Event** - Shows scale and capability
4. **Setup Process** - Your team professionally installing tents
5. **Business Location** - Your facility or warehouse with equipment

### Photo Tips:

- **Golden Hour**: Take photos during sunset/sunrise for warm lighting
- **Wide Angles**: Show the full scope of your tent setups
- **Action Shots**: People enjoying events under your tents
- **Professional Quality**: Well-lit, clear, and in focus
- **Brand Colors**: Images that complement your blue and orange brand colors

## Current Background Features

- **Professional wedding tent image** from Unsplash
- **Responsive design** - works on all devices
- **Overlay gradient** - ensures text readability
- **Mobile optimized** - proper display on phones and tablets
- **Performance optimized** - fast loading

## Technical Details

- The background uses `background-attachment: fixed` for a parallax effect on desktop
- Mobile devices use `background-attachment: scroll` for better performance
- Gradient overlay ensures text remains readable over any background
- Image is set to `cover` to fill the entire hero section properly

## Multiple Background Options

You can create multiple hero backgrounds for different pages or seasons by:

1. Creating additional CSS classes like `.hero-corporate`, `.hero-wedding`
2. Adding different background images for each
3. Applying the appropriate class to different pages

Remember to always test your background images on different screen sizes to ensure they look great on both desktop and mobile devices!
