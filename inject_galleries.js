const fs = require('fs');
const path = require('path');

const basePath = 'd:/Compasstdmc';
const pagesPath = path.join(basePath, 'pages');
const imagesPath = path.join(basePath, 'images');

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
    
    let html = "\\n  <!-- Gallery Slider & Lightbox -->\\n  <section class=\'section\'>\\n" +
"    <div class=\'container\'>\\n" +
"      <div class=\'section-header\'>\\n" +
"        <h2>" + title + " Gallery</h2>\\n" +
"      </div>\\n" +
"      <div style=\'max-width: 900px; margin: 0 auto; position: relative; border-radius: var(--radius-md); overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 1px solid rgba(200, 164, 90, 0.2);\'>\\n" +
"        <div id=\'carouselTrack_" + sectionId + "\' style=\'display: flex; transition: transform 0.4s ease-in-out; width: 100%;\'>\\n";

    images.forEach((img, idx) => {
        html += "          <div style=\'min-width: 100%; position: relative; aspect-ratio: 16/9; background: #111;\'>\\n" +
"            <img src=\'" + rel + "images/" + img + "\' alt=\'" + title + " image " + (idx+1) + "\'\\n" +
"              style=\'width: 100%; height: 100%; object-fit: cover; cursor: pointer;\'\\n" +
"              onclick=\'openModal(this.src, '" + title.replace(/'/g, "\\\\'") + "')\'>\\n" +
"          </div>\\n";
    });

    html += "        </div>\\n" +
"        <button onclick=\'moveSlide_" + sectionId + "(-1)\' aria-label=\'Previous Slide\'\\n" +
"          style=\'position: absolute; top: 50%; left: 15px; transform: translateY(-50%); background: rgba(0,0,0,0.6); color: var(--clr-gold); border: 1px solid var(--clr-gold); width: 44px; height: 44px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; z-index: 5;\'>\\n" +
"          <i class=\'fa-solid fa-chevron-left\'></i>\\n" +
"        </button>\\n" +
"        <button onclick=\'moveSlide_" + sectionId + "(1)\' aria-label=\'Next Slide\'\\n" +
"          style=\'position: absolute; top: 50%; right: 15px; transform: translateY(-50%); background: rgba(0,0,0,0.6); color: var(--clr-gold); border: 1px solid var(--clr-gold); width: 44px; height: 44px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; z-index: 5;\'>\\n" +
"          <i class=\'fa-solid fa-chevron-right\'></i>\\n" +
"        </button>\\n" +
"      </div>\\n" +
"      \\n" +
"      <div style=\'max-width: 900px; margin: 1.5rem auto 0 auto; display: flex; justify-content: center; gap: 10px; overflow-x: auto; padding: 5px;\'>\\n";

    images.forEach((img, idx) => {
        html += "        <img src=\'" + rel + "images/" + img + "\' class=\'thumb-item_" + sectionId + "\' onclick=\'goToSlide_" + sectionId + "(" + idx + ")\'\\n" +
"          style=\'width: 80px; height: 55px; object-fit: cover; border-radius: 6px; cursor: pointer; border: 2px solid " + (idx === 0 ? 'var(--clr-gold)' : 'transparent') + "; opacity: " + (idx === 0 ? '1' : '0.6') + "; transition: opacity 0.2s, border-color 0.2s;\'>\\n";
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

const modalScript = "\\n" +
"  <!-- Modal Lightbox for Selected Photo -->\\n" +
"  <div id=\'imageModal\'\\n" +
"    style=\'display: none; position: fixed; inset: 0; z-index: 9999; background: rgba(0,0,0,0.92); align-items: center; justify-content: center; flex-direction: column; padding: 20px;\'>\\n" +
"    <span onclick=\'closeModal()\'\\n" +
"      style=\'position: absolute; top: 20px; right: 30px; font-size: 2.5rem; color: #fff; cursor: pointer;\'>&times;</span>\\n" +
"    <img id=\'modalImg\' src=\'\' alt=\'Enlarged view\'\\n" +
"      style=\'max-width: 90%; max-height: 80vh; border-radius: 8px; border: 2px solid var(--clr-gold); box-shadow: 0 0 30px rgba(0,0,0,0.8);\'>\\n" +
"    <p id=\'modalCaption\' style=\'color: var(--clr-gold); margin-top: 15px; font-size: 1.1rem; text-align: center;\'></p>\\n" +
"  </div>\\n" +
"  <script>\\n" +
"    function openModal(src, caption) {\\n" +
"      document.getElementById('modalImg').src = src;\\n" +
"      document.getElementById('modalCaption').innerText = caption;\\n" +
"      document.getElementById('imageModal').style.display = 'flex';\\n" +
"    }\\n" +
"    function closeModal() {\\n" +
"      document.getElementById('imageModal').style.display = 'none';\\n" +
"    }\\n" +
"  </script>\\n";

const existingPages = [
    { name: 'auditorium.html', folder: 'campus', title: 'Auditorium', imgDir: 'auditorium', structured: true },
    { name: 'library.html', folder: 'campus', title: 'Library', imgDir: 'library', structured: false },
    { name: 'sports.html', folder: 'campus', title: 'Sports', imgDir: 'sports', structured: true },
    { name: 'wellness.html', folder: 'campus', title: 'Wellness', imgDir: 'wellness', structured: false },
    { name: 'cafeteria.html', folder: 'campus', title: 'Cafeteria', imgDir: 'cafeteria', structured: false },
    { name: 'index.html', folder: 'hostel', title: 'Hostel', imgDir: 'hostel', structured: false }
];

existingPages.forEach(page => {
    const filePath = path.join(pagesPath, page.folder, page.name);
    if (!fs.existsSync(filePath)) {
        console.log('File not found: ' + filePath);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it already has imageModal to prevent duplicates
    if (content.includes('id="imageModal"')) {
        console.log('Skipped (already injected): ' + page.name);
        return;
    }
    
    let rel = '../../';
    const dir = path.join(imagesPath, page.imgDir);
    let galleryHtml = '';

    if (page.structured && fs.existsSync(dir)) {
        const subdirs = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isDirectory());
        const rootImages = fs.readdirSync(dir).filter(f => !fs.statSync(path.join(dir, f)).isDirectory() && f.match(/\.(jpg|jpeg|png|gif)$/i));
        if (rootImages.length > 0) {
            galleryHtml += generateGallerySection('Overview', rootImages.map(img => page.imgDir + '/' + encodeURIComponent(img)), 'root', rel);
        }
        subdirs.forEach((subdir, idx) => {
            const subdirPath = path.join(dir, subdir);
            const images = getImagesRecursively(subdirPath, page.imgDir + '/' + subdir + '/');
            if (images.length > 0) {
                galleryHtml += generateGallerySection(subdir, images, 'sub' + idx, rel);
            }
        });
    } else {
        const images = getImagesRecursively(dir, page.imgDir + '/');
        if (images.length > 0) {
            galleryHtml += generateGallerySection(page.title, images, 'main', rel);
        }
    }
    
    if (galleryHtml) {
        // Insert before <!-- Footer -->
        content = content.replace('<!-- Footer -->', galleryHtml + "\\n" + modalScript + "\\n<!-- Footer -->");
        fs.writeFileSync(filePath, content);
        console.log('Updated ' + page.name);
    } else {
        console.log('No gallery html for ' + page.name);
    }
});

// Update campus/index.html to use ALL 41 images
const campusIndex = path.join(pagesPath, 'campus', 'index.html');
if (fs.existsSync(campusIndex)) {
    let content = fs.readFileSync(campusIndex, 'utf8');
    const images = getImagesRecursively(path.join(imagesPath, 'campus'), 'campus/');
    if (images.length > 0) {
        const newGalleryHtml = generateGallerySection('Campus', images, 'main', '../../');
        // We need to replace the existing gallery section.
        const parts = content.split('<!-- Gallery Slider & Lightbox -->');
        if (parts.length > 1) {
            const footerParts = parts[1].split('<!-- ====== FOOTER ====== -->');
            if (footerParts.length > 1) {
                content = parts[0] + newGalleryHtml + "\\n" + modalScript + "\\n<!-- ====== FOOTER ====== -->" + footerParts.slice(1).join('<!-- ====== FOOTER ====== -->');
                fs.writeFileSync(campusIndex, content);
                console.log('Updated campus/index.html gallery');
            }
        }
    }
}
