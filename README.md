# Grow a Garden Pets - Roblox Store

A modern, responsive website for selling "Grow a Garden" map pets for Robux. Users can browse pets, add them to cart, and get teleported to your Roblox group to complete payment.

## Features

### 🛍️ **User Features**
- **Username Requirement**: Users must enter their Roblox username before purchasing
- **Pet Catalog**: Browse through 26+ unique pets with images, descriptions, and prices
- **Shopping Cart**: Add/remove pets, view totals, and manage orders
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Local Storage**: Remembers username and cart items between sessions

### 🔧 **Admin Features**
- **Add New Pets**: Add new pets with custom names, prices, images, and descriptions
- **Edit Existing Pets**: Modify pet names, prices, images, and descriptions
- **Delete Pets**: Remove pets from the store
- **Price Management**: Change prices for any pet at any time
- **Secure Access**: Admin panel accessible via the Admin button

### 🚀 **Roblox Integration**
- **Teleportation**: Users are automatically teleported to your Roblox group after checkout
- **Group Link**: Direct link to [https://www.roblox.com/share/g/58795671](https://www.roblox.com/share/g/58795671)
- **Order Summary**: Shows username and total before teleporting

## 🚀 Quick Start

1. **Upload Files**: Upload all files to your web hosting service
2. **Open Website**: Navigate to your domain or hosting URL
3. **Start Selling**: Users can immediately start browsing and purchasing pets

## 📁 File Structure

```
website/
├── index.html          # Main website file
├── styles.css          # Styling and responsive design
├── script.js           # All functionality and logic
├── README.md           # This instruction file
└── [Pet Images]        # All .webp pet images
```

## 🎯 How to Use

### For Users

1. **Set Username**
   - Enter your Roblox username in the input field
   - Click "Set Username" button
   - Username is saved and remembered

2. **Browse Pets**
   - View all available pets in the grid
   - Read descriptions and see prices
   - Pet images are displayed with fallback placeholders

3. **Add to Cart**
   - Click "Add to Cart" on any pet
   - Pet is added to your shopping cart
   - Cart shows item count and total price

4. **Checkout**
   - Review items in cart
   - Click "Checkout" button
   - Get teleported to Roblox group for payment

### For Admins (You)

1. **Access Admin Panel**
   - Click the "Admin" button in the header
   - Admin panel opens with full control

2. **Add New Pets**
   - Fill in pet name, price, image URL, and description
   - Click "Add Pet" to add to store
   - New pet appears immediately

3. **Edit Existing Pets**
   - Click "Edit" button on any pet
   - Modify name, price, image, or description
   - Changes are saved instantly

4. **Delete Pets**
   - Click "Delete" button on any pet
   - Confirm deletion
   - Pet is removed from store

5. **Change Prices**
   - Use the edit function to change any pet's price
   - Price changes are applied immediately
   - No need to restart or refresh

## 🔧 Customization

### Adding New Pets
```javascript
// In script.js, add to the pets array:
{
    id: 27,
    name: 'New Pet Name',
    price: 250,
    image: 'new_pet_image.webp',
    description: 'Description of the new pet.'
}
```

### Changing Colors
```css
/* In styles.css, modify these variables: */
:root {
    --primary-color: #4CAF50;      /* Main green color */
    --secondary-color: #ff6b6b;    /* Accent color */
    --background-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Modifying Roblox Group URL
```javascript
// In script.js, line ~500, change this URL:
const robloxGroupUrl = 'https://www.roblox.com/share/g/YOUR_GROUP_ID';
```

## 📱 Responsive Design

The website automatically adapts to:
- **Desktop**: Full grid layout with sidebar cart
- **Tablet**: Responsive grid with mobile-optimized cart
- **Mobile**: Single-column layout with touch-friendly buttons

## 💾 Data Storage

- **Username**: Stored in browser localStorage
- **Cart Items**: Saved between sessions
- **Pet Data**: Stored locally with admin modifications
- **No Server Required**: Everything works client-side

## 🎨 Design Features

- **Modern UI**: Clean, professional design with gradients
- **Smooth Animations**: Hover effects and transitions
- **Glass Morphism**: Semi-transparent cards with backdrop blur
- **Icon Integration**: Font Awesome icons throughout
- **Typography**: Poppins font for modern readability

## 🔒 Security Features

- **Client-Side Only**: No sensitive data sent to servers
- **Local Storage**: All data stays in user's browser
- **Admin Access**: Simple button access (no password required)
- **Input Validation**: Username length and format checking

## 🚀 Performance

- **Fast Loading**: Optimized images and minimal dependencies
- **Smooth Scrolling**: CSS animations and transitions
- **Efficient Rendering**: Dynamic content generation
- **Mobile Optimized**: Touch-friendly interface

## 📞 Support

For technical support or customization requests:
1. Check the code comments in `script.js`
2. Modify CSS variables in `styles.css`
3. Update pet data in the pets array
4. Test changes in a local environment first

## 🔄 Updates

To update the website:
1. **Add New Pets**: Use the admin panel
2. **Change Prices**: Edit existing pets through admin
3. **Modify Design**: Update CSS files
4. **Add Features**: Extend JavaScript functionality

## 🌟 Pro Tips

1. **Image Optimization**: Use .webp format for best performance
2. **Price Strategy**: Start with competitive prices and adjust based on demand
3. **Regular Updates**: Add new pets regularly to keep users engaged
4. **Mobile First**: Test on mobile devices for best user experience
5. **Backup Data**: Export pet data periodically for safekeeping

---

**Ready to start selling pets?** 🚀

Your website is now fully functional and ready to accept customers. Users will be automatically teleported to your Roblox group to complete their purchases!
