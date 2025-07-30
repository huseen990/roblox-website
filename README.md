# Garden Treasures - Roblox Items Store

A beautiful, modern website for selling Roblox items specifically for the "Grow a Garden" map. This website features a responsive design, shopping cart functionality, and an attractive garden-themed interface.

## 🌟 Features

- **Modern Design**: Clean, professional layout with garden-themed colors and animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Shopping Cart**: Full cart functionality with quantity management
- **Product Showcase**: Beautiful product cards with descriptions and pricing
- **Contact Form**: Easy way for customers to get in touch
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Smooth Animations**: Engaging animations and transitions throughout

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- Basic knowledge of HTML, CSS, and JavaScript (for customization)

### Installation
1. Download all files to your web server or local directory
2. Open `index.html` in your web browser
3. The website is ready to use!

## 📁 File Structure

```
website/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🛠️ Customization

### Adding Your Roblox Items

To add your own Roblox items, edit the `products` array in `script.js`:

```javascript
const products = [
    {
        id: 1,
        name: "Your Item Name",
        description: "Description of your item",
        price: 15.99,
        image: "🌱", // You can use emojis or image URLs
        category: "Category"
    },
    // Add more items...
];
```

### Changing Colors and Theme

The website uses a green garden theme. To change colors, edit the CSS variables in `styles.css`:

- Primary green: `#4caf50`
- Dark green: `#2d5a27`
- Light green: `#e8f5e8`

### Updating Contact Information

Edit the contact section in `index.html`:

```html
<div class="contact-item">
    <i class="fab fa-discord"></i>
    <div>
        <h3>Discord</h3>
        <p>YourDiscord#1234</p>
    </div>
</div>
```

### Changing the Logo and Brand

Update the navigation logo in `index.html`:

```html
<div class="nav-logo">
    <i class="fas fa-seedling"></i>
    <span>Your Brand Name</span>
</div>
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Green (#4caf50) - Represents growth and nature
- **Secondary**: Dark Green (#2d5a27) - For headings and emphasis
- **Background**: Light greens and whites for a clean look
- **Accent**: Red (#ff6b6b) for cart notifications

### Typography
- **Font**: Poppins (Google Fonts) - Modern and readable
- **Weights**: 300, 400, 500, 600, 700 for variety

### Animations
- Floating elements in hero section
- Smooth scroll navigation
- Fade-in animations for products
- Hover effects on buttons and cards

## 📱 Responsive Design

The website is fully responsive and includes:

- **Desktop**: Full layout with side-by-side sections
- **Tablet**: Adjusted grid layouts
- **Mobile**: Stacked layout with hamburger menu

## 🛒 Shopping Cart Features

- Add/remove items
- Quantity adjustment
- Total calculation
- Checkout process
- Cart persistence during session

## 📞 Contact Information

The website includes multiple ways for customers to contact you:

- **Email**: contact@gardentreasures.com
- **Discord**: GardenTreasures#1234
- **Roblox**: GardenTreasures
- **Contact Form**: For general inquiries

## 🔧 Technical Details

### Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

### Dependencies
- Font Awesome (for icons)
- Google Fonts (Poppins)

### Performance
- Optimized CSS and JavaScript
- Minimal external dependencies
- Fast loading times

## 🚀 Deployment

### Local Development
1. Open `index.html` in your browser
2. Make changes to files
3. Refresh browser to see updates

### Web Hosting
1. Upload all files to your web server
2. Ensure `index.html` is in the root directory
3. Access via your domain name

### GitHub Pages
1. Create a GitHub repository
2. Upload all files
3. Enable GitHub Pages in repository settings
4. Your site will be available at `username.github.io/repository-name`

## 📝 Customization Tips

### Adding Real Images
Replace emoji icons with actual images:

```javascript
{
    id: 1,
    name: "Golden Watering Can",
    description: "Premium watering can that grows plants 3x faster",
    price: 15.99,
    image: "images/watering-can.png", // Use image path instead of emoji
    category: "Tools"
}
```

### Adding More Sections
You can easily add new sections by following the existing pattern in `index.html` and adding corresponding styles in `styles.css`.

### Payment Integration
For real payment processing, you'll need to integrate with payment gateways like PayPal, Stripe, or Roblox's payment system.

## 🎯 SEO Optimization

The website includes:
- Semantic HTML structure
- Meta tags for social sharing
- Fast loading times
- Mobile-friendly design

## 📞 Support

If you need help customizing the website:

1. Check this README for common customization tasks
2. Review the code comments for guidance
3. Contact the developer for additional support

## 📄 License

This website template is free to use and modify for your Roblox items business.

---

**Happy selling! 🌱✨** 