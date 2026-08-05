const fs = require('fs');
const path = require('path');

const basePath = 'd:/Compasstdmc';
const pagesPath = path.join(basePath, 'pages');
const imagesPath = path.join(basePath, 'images');

const header = (title, relativePath) => "<!DOCTYPE html>\\n" +
"<html lang=\"en\">\\n" +
"<head>\\n" +
"  <meta charset=\"UTF-8\">\\n" +
"  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\\n" +
"  <title>" + title + " | TD Medical College, Alappuzha</title>\\n" +
"  <link rel=\"icon\" type=\"image/jpeg\" href=\"" + relativePath + "images/WhatsApp Image 2026-07-31 at 12.29.22 AM (13).jpeg\">\\n" +
"  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\\n" +
"  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\\n" +
"  <link href=\"https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap\" rel=\"stylesheet\">\\n" +
"  <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css\">\\n" +
"  <link rel=\"stylesheet\" href=\"" + relativePath + "css/navbar.css\">\\n" +
"  <link rel=\"stylesheet\" href=\"" + relativePath + "css/style.css\">\\n" +
"  <link rel=\"stylesheet\" href=\"" + relativePath + "css/footer.css\">\\n" +
"</head>\\n" +
"<body>\\n" +
"  <!-- Navbar -->\\n" +
"  <nav class=\"navbar\" id=\"navbar\">\\n" +
"    <a href=\"" + relativePath + "index.html\" class=\"nav-brand\">\\n" +
"      <img src=\"" + relativePath + "images/WhatsApp Image 2026-07-31 at 12.29.22 AM (13).jpeg\" alt=\"TD Medical College Logo\">\\n" +
"      <div class=\"nav-brand-text\">\\n" +
"        <span class=\"brand-name\">TD Medical College</span>\\n" +
"        <span class=\"brand-sub\">Alappuzha</span>\\n" +
"      </div>\\n" +
"    </a>\\n" +
"    <div class=\"nav-links\" id=\"navLinks\">\\n" +
"      <a href=\"" + relativePath + "index.html\">Home</a>\\n" +
"      <a href=\"" + relativePath + "pages/campus/index.html\">Campus</a>\\n" +
"      <a href=\"" + relativePath + "pages/hostel/index.html\">Hostel</a>\\n" +
"      <a href=\"" + relativePath + "pages/academics/index.html\">Academics</a>\\n" +
"      <a href=\"" + relativePath + "pages/explore/index.html\">Explore</a>\\n" +
"      <a href=\"" + relativePath + "pages/contact.html\">Contact</a>\\n" +
"    </div>\\n" +
"    <button class=\"hamburger\" id=\"hamburger\" aria-label=\"Toggle menu\">\\n" +
"      <span></span><span></span><span></span>\\n" +
"    </button>\\n" +
"  </nav>\\n" +
"  <div class=\"nav-overlay\" id=\"navOverlay\"></div>\\n" +
"\\n" +
"  <!-- Hero -->\\n" +
"  <section class=\"hero-mini\" style=\"position: relative; padding-top: calc(var(--navbar-height, 72px) + 2rem); padding-bottom: 3rem; background: linear-gradient(135deg, #1c2b1e 0%, #0d170e 100%); text-align: center; display: flex; align-items: center; justify-content: center;\">\\n" +
"    <div class=\"hero-content\" style=\"margin-left: 0; max-width: 800px; width: 90%;\">\\n" +
"      <span class=\"hero-subtitle\" style=\"display: block; color: var(--clr-gold); letter-spacing: 2px;\">GALLERY</span>\\n" +
"      <h1 style=\"margin-top: 0.5rem; margin-bottom: 1rem;\">" + title + "</h1>\\n" +
"    </div>\\n" +
"  </section>\\n";

const footer = (relativePath) => "\\n" +
"  <!-- Modal Lightbox for Selected Photo -->\\n" +
"  <div id=\"imageModal\"\\n" +
"    style=\"display: none; position: fixed; inset: 0; z-index: 9999; background: rgba(0,0,0,0.92); align-items: center; justify-content: center; flex-direction: column; padding: 20px;\">\\n" +
"    <span onclick=\"closeModal()\"\\n" +
"      style=\"position: absolute; top: 20px; right: 30px; font-size: 2.5rem; color: #fff; cursor: pointer;\">&times;</span>\\n" +
"    <img id=\"modalImg\" src=\"\" alt=\"Enlarged view\"\\n" +
"      style=\"max-width: 90%; max-height: 80vh; border-radius: 8px; border: 2px solid var(--clr-gold); box-shadow: 0 0 30px rgba(0,0,0,0.8);\">\\n" +
"    <p id=\"modalCaption\" style=\"color: var(--clr-gold); margin-top: 15px; font-size: 1.1rem; text-align: center;\"></p>\\n" +
"  </div>\\n" +
"  \\n" +
"  <script>\\n" +
"    function openModal(src, caption) {\\n" +
"      document.getElementById('modalImg').src = src;\\n" +
"      document.getElementById('modalCaption').innerText = caption;\\n" +
"      document.getElementById('imageModal').style.display = 'flex';\\n" +
"    }\\n" +
"    function closeModal() {\\n" +
"      document.getElementById('imageModal').style.display = 'none';\\n" +
"    }\\n" +
"  </script>\\n" +
"\\n" +
"  <!-- Footer -->\\n" +
"  <footer class=\"footer\">\\n" +
"    <div class=\"footer-grid\">\\n" +
"      <div class=\"footer-col footer-about\">\\n" +
"        <h4>TD Medical College</h4>\\n" +
"        <p>A premier institution of medical education in Alappuzha, Kerala.</p>\\n" +
"      </div>\\n" +
"      <div class=\"footer-col\">\\n" +
"        <h4>Quick Links</h4>\\n" +
"        <div class=\"footer-links\">\\n" +
"          <a href=\"" + relativePath + "index.html\">Home</a>\\n" +
"          <a href=\"" + relativePath + "pages/campus/index.html\">Campus</a>\\n" +
"          <a href=\"" + relativePath + "pages/hostel/index.html\">Hostel</a>\\n" +
"          <a href=\"" + relativePath + "pages/academics/index.html\">Academics</a>\\n" +
"          <a href=\"" + relativePath + "pages/contact.html\">Contact</a>\\n" +
"        </div>\\n" +
"      </div>\\n" +
"    </div>\\n" +
"    <div class=\"footer-bottom\">\\n" +
"      <p>&copy; 2026 TD Medical College, Alappuzha. All rights reserved.</p>\\n" +
"    </div>\\n" +
"  </footer>\\n" +
"\\n" +
"  <script src=\"" + relativePath + "js/navbar.js\"></script>\\n" +
"  <script src=\"" + relativePath + "js/main.js\"></script>\\n" +
"</body>\\n" +
"</html>";

function getImagesRecursively(dir, relPathToImages) {
    let images = [];
    if (!fs.existsSync(dir)) return images;
    
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            images = images.concat(getImagesRecursively(fullPath, relPathToImages + file + '/'));
        } else if (file.match(/\.(jpg|jpeg|png|gif)$/i)) {
            images.push(relPathToImages + encodeURIComponent(file));
        }
    }
    return images;
}

function generateGallerySection(title, images, sectionId, rel) {
    if (images.length === 0) return '';
    
    let html = "\\n  <section class=\"section\">\\n" +
"    <div class=\"container\">\\n" +
"      <div class=\"section-header\">\\n" +
"        <h2>" + title + "</h2>\\n" +
"      </div>\\n" +
"      <div style=\"max-width: 900px; margin: 0 auto; position: relative; border-radius: var(--radius-md); overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 1px solid rgba(200, 164, 90, 0.2);\">\\n" +
"        <div id=\"carouselTrack_" + sectionId + "\" style=\"display: flex; transition: transform 0.4s ease-in-out; width: 100%;\">\\n";

    images.forEach((img, idx) => {
        html += "          <div style=\"min-width: 100%; position: relative; aspect-ratio: 16/9; background: #111;\">\\n" +
"            <img src=\"" + rel + "images/" + img + "\" alt=\"" + title + " image " + (idx+1) + "\"\\n" +
"              style=\"width: 100%; height: 100%; object-fit: cover; cursor: pointer;\"\\n" +
"              onclick=\"openModal(this.src, '" + title.replace(/'/g, "\\\\'") + "')\">\\n" +
"          </div>\\n";
    });

    html += "        </div>\\n" +
"        <button onclick=\"moveSlide_" + sectionId + "(-1)\" aria-label=\"Previous Slide\"\\n" +
"          style=\"position: absolute; top: 50%; left: 15px; transform: translateY(-50%); background: rgba(0,0,0,0.6); color: var(--clr-gold); border: 1px solid var(--clr-gold); width: 44px; height: 44px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; z-index: 5;\">\\n" +
"          <i class=\"fa-solid fa-chevron-left\"></i>\\n" +
"        </button>\\n" +
"        <button onclick=\"moveSlide_" + sectionId + "(1)\" aria-label=\"Next Slide\"\\n" +
"          style=\"position: absolute; top: 50%; right: 15px; transform: translateY(-50%); background: rgba(0,0,0,0.6); color: var(--clr-gold); border: 1px solid var(--clr-gold); width: 44px; height: 44px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; z-index: 5;\">\\n" +
"          <i class=\"fa-solid fa-chevron-right\"></i>\\n" +
"        </button>\\n" +
"      </div>\\n" +
"      \\n" +
"      <div style=\"max-width: 900px; margin: 1.5rem auto 0 auto; display: flex; justify-content: center; gap: 10px; overflow-x: auto; padding: 5px;\">\\n";

    images.forEach((img, idx) => {
        html += "        <img src=\"" + rel + "images/" + img + "\" class=\"thumb-item_" + sectionId + "\" onclick=\"goToSlide_" + sectionId + "(" + idx + ")\"\\n" +
"          style=\"width: 80px; height: 55px; object-fit: cover; border-radius: 6px; cursor: pointer; border: 2px solid " + (idx === 0 ? 'var(--clr-gold)' : 'transparent') + "; opacity: " + (idx === 0 ? '1' : '0.6') + "; transition: opacity 0.2s, border-color 0.2s;\">\\n";
    });

    html += "      </div>\\n" +
"    </div>\\n" +
"  </section>\\n" +
"  <script>\\n" +
"    let currentSlide_" + sectionId + " = 0;\\n" +
"    const totalSlides_" + sectionId + " = " + images.length + ";\\n" +
"    function updateCarousel_" + sectionId + "() {\\n" +
"      const track = document.getElementById('carouselTrack_" + sectionId + "');\\n" +
"      if(track) track.style.transform = `translateX(-${currentSlide_" + sectionId + " * 100}%)`;\\n" +
"      const thumbs = document.querySelectorAll('.thumb-item_" + sectionId + "');\\n" +
"      thumbs.forEach((thumb, idx) => {\\n" +
"        if (idx === currentSlide_" + sectionId + ") {\\n" +
"          thumb.style.borderColor = 'var(--clr-gold)';\\n" +
"          thumb.style.opacity = '1';\\n" +
"        } else {\\n" +
"          thumb.style.borderColor = 'transparent';\\n" +
"          thumb.style.opacity = '0.6';\\n" +
"        }\\n" +
"      });\\n" +
"    }\\n" +
"    function moveSlide_" + sectionId + "(direction) {\\n" +
"      currentSlide_" + sectionId + " = (currentSlide_" + sectionId + " + direction + totalSlides_" + sectionId + ") % totalSlides_" + sectionId + ";\\n" +
"      updateCarousel_" + sectionId + "();\\n" +
"    }\\n" +
"    function goToSlide_" + sectionId + "(index) {\\n" +
"      currentSlide_" + sectionId + " = index;\\n" +
"      updateCarousel_" + sectionId + "();\\n" +
"    }\\n" +
"  </script>\\n";
    return html;
}

const pagesToGenerate = [
    { name: 'miscellaneous', folder: 'campus', title: 'Miscellaneous', imgDir: 'miscellaneous', structured: true },
    { name: 'mh1', folder: 'hostel', title: "Men's Hostel 1", imgDir: 'MH1', structured: false },
    { name: 'mh2', folder: 'hostel', title: "Men's Hostel 2", imgDir: 'MH2', structured: false },
    { name: 'mh3', folder: 'hostel', title: "Men's Hostel 3", imgDir: 'MH3', structured: false },
    { name: 'wh1', folder: 'hostel', title: "Women's Hostel 1", imgDir: 'WH1', structured: false },
    { name: 'wh2', folder: 'hostel', title: "Women's Hostel 2", imgDir: 'WH2', structured: false },
    { name: 'anatomy', folder: 'academics', title: 'Anatomy', imgDir: 'anatomy', structured: true },
    { name: 'physiology', folder: 'academics', title: 'Physiology', imgDir: 'physiology', structured: true },
    { name: 'biochemistry', folder: 'academics', title: 'Biochemistry', imgDir: 'biochemistry', structured: true }
];

pagesToGenerate.forEach(page => {
    const rel = '../../';
    let html = header(page.title, rel);
    const dir = path.join(imagesPath, page.imgDir);
    
    if (page.structured && fs.existsSync(dir)) {
        const subdirs = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isDirectory());
        
        // Also check if root has images
        const rootImages = fs.readdirSync(dir).filter(f => !fs.statSync(path.join(dir, f)).isDirectory() && f.match(/\.(jpg|jpeg|png|gif)$/i));
        if (rootImages.length > 0) {
            html += generateGallerySection('Overview', rootImages.map(img => page.imgDir + '/' + encodeURIComponent(img)), 'root', rel);
        }

        subdirs.forEach((subdir, idx) => {
            const subdirPath = path.join(dir, subdir);
            
            // Check for nested subdirs (like theater -> Pan cinemas)
            const nestedSubdirs = fs.readdirSync(subdirPath).filter(f => fs.statSync(path.join(subdirPath, f)).isDirectory());
            if (nestedSubdirs.length > 0) {
                nestedSubdirs.forEach((nSubdir, nIdx) => {
                    const nSubdirPath = path.join(subdirPath, nSubdir);
                    const images = getImagesRecursively(nSubdirPath, page.imgDir + '/' + subdir + '/' + nSubdir + '/');
                    if (images.length > 0) {
                        html += generateGallerySection(subdir + ' - ' + nSubdir, images, 'sub' + idx + '_' + nIdx, rel);
                    }
                });
                
                // Root images of this subdir
                const rootSubdirImages = fs.readdirSync(subdirPath).filter(f => !fs.statSync(path.join(subdirPath, f)).isDirectory() && f.match(/\.(jpg|jpeg|png|gif)$/i));
                if (rootSubdirImages.length > 0) {
                    html += generateGallerySection(subdir, rootSubdirImages.map(img => page.imgDir + '/' + subdir + '/' + encodeURIComponent(img)), 'sub' + idx + '_root', rel);
                }
            } else {
                const images = getImagesRecursively(subdirPath, page.imgDir + '/' + subdir + '/');
                if (images.length > 0) {
                    html += generateGallerySection(subdir, images, 'sub' + idx, rel);
                }
            }
        });
    } else {
        const images = getImagesRecursively(dir, page.imgDir + '/');
        if (images.length > 0) {
            html += generateGallerySection('Gallery', images, 'main', rel);
        } else {
             html += "\\n  <section class='section'>\\n    <div class='container'>\\n      <div class='section-header'>\\n        <h2>" + page.title + "</h2>\\n        <p>No images available yet.</p>\\n      </div>\\n    </div>\\n  </section>\\n";
        }
    }
    
    html += footer(rel);
    fs.writeFileSync(path.join(pagesPath, page.folder, page.name + '.html'), html);
    console.log('Created ' + page.name + '.html');
});
