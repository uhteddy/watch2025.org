import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import satori from 'satori';
import { html } from 'satori-html';
import yaml from 'js-yaml';

// Get the directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const initiativesDir = path.join(rootDir, 'src', 'content', 'initiatives');
const ogDir = path.join(rootDir, 'public', 'og');

// Define status colors directly
const statusConfig = {
  Proposed: { bg: '#FEF3C7', text: '#92400E' },
  'In Progress': { bg: '#DBEAFE', text: '#1E40AF' },
  Completed: { bg: '#D1FAE5', text: '#065F46' },
  Blocked: { bg: '#FEE2E2', text: '#B91C1C' }
};

// Create OG directory if it doesn't exist
if (!fs.existsSync(ogDir)) {
  fs.mkdirSync(ogDir, { recursive: true });
  console.log(`Created directory: ${ogDir}`);
}

// Get font data from Google Fonts to avoid variable font issues
async function getFontData() {
  try {
    const interFontRegular = await fetch('https://fonts.googleapis.com/css2?family=Inter&display=swap')
      .then(res => res.text())
      .then(css => {
        const fontUrl = css.match(/src: url\((.+?)\)/)?.[1];
        return fetch(fontUrl).then(res => res.arrayBuffer());
      });
    
    const interFontBold = await fetch('https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap')
      .then(res => res.text())
      .then(css => {
        const fontUrl = css.match(/src: url\((.+?)\)/)?.[1];
        return fetch(fontUrl).then(res => res.arrayBuffer());
      });
      
    return {
      regular: interFontRegular,
      bold: interFontBold
    };
  } catch (error) {
    console.warn('Failed to fetch Inter font, using system sans-serif:', error);
    return null;
  }
}

// Process each initiative markdown file
async function generateOGImages() {
  const files = fs.readdirSync(initiativesDir);
  const fontData = await getFontData();
  
  const fonts = fontData ? [
    {
      name: 'Inter',
      data: fontData.regular,
      weight: 400,
      style: 'normal',
    },
    {
      name: 'Inter',
      data: fontData.bold,
      weight: 700,
      style: 'normal',
    }
  ] : undefined; // Use system fonts if we couldn't load Inter
  
  for (const file of files) {
    if (file.endsWith('.md') || file.endsWith('.mdx')) {
      const filePath = path.join(initiativesDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Extract frontmatter
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatterMatch) continue;
      
      const frontmatter = yaml.load(frontmatterMatch[1]);
      const { title, description, status } = frontmatter;
      
      if (!title) continue;
      
      // Get status colors
      const statusColors = statusConfig[status] || 
        { bg: '#E5E7EB', text: '#374151' }; // Default gray if status not found
      
      // Generate SVG with satori
      const svg = await satori(
        html`
          <div style="
            display: flex; 
            flex-direction: column; 
            width: 1200px; 
            height: 630px; 
            background: linear-gradient(to bottom right, #ffffff, #f7f7f7);
            position: relative;
            overflow: hidden;
          ">
            <div style="
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
              background-size: 20px 20px;
              opacity: 0.3;
              display: flex;
            "></div>
            
            <div style="
              position: absolute;
              top: 0;
              left: 0;
              width: 8px;
              height: 100%;
              background-color: #3B82F6;
              display: flex;
            "></div>
            
            <div style="
              display: flex; 
              flex-direction: column; 
              padding: 60px;
              flex-grow: 1;
              z-index: 1;
            ">
              <div style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 36px;
              ">
                <div style="
                  font-size: 24px;
                  font-weight: bold;
                  color: #3B82F6;
                  display: flex;
                ">
                  Project 2025 Tracker
                </div>
                <div style="
                  font-size: 24px;
                  color: #6B7280;
                  display: flex;
                ">
                  watch2025.org
                </div>
              </div>
              
              <div style="
                display: flex; 
                background-color: ${statusColors.bg}; 
                color: ${statusColors.text}; 
                padding: 8px 16px; 
                border-radius: 9999px;
                margin-bottom: 32px;
                font-size: 24px;
                align-self: flex-start;
                box-shadow: 0 2px 4px rgba(0,0,0,0.05);
              ">
                ${status || 'No Status'}
              </div>
              
              <h1 style="
                font-size: 64px; 
                font-weight: bold; 
                margin: 0 0 32px 0; 
                color: #111827;
                line-height: 1.2;
                display: flex;
              ">
                ${title}
              </h1>
              
              <p style="
                font-size: 32px; 
                margin: 0; 
                color: #4B5563; 
                flex-grow: 1;
                line-height: 1.4;
                display: flex;
              ">
                ${description || ''}
              </p>
              
              <div style="
                margin-top: 40px; 
                padding-top: 20px;
                border-top: 1px solid #E5E7EB;
                display: flex;
                justify-content: space-between;
                align-items: center;
              ">
                <div style="
                  font-size: 20px;
                  color: #6B7280;
                  display: flex;
                ">
                  Last updated: ${new Date().toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}
                </div>
                <div style="
                  font-size: 20px;
                  color: #3B82F6;
                  font-weight: bold;
                  display: flex;
                ">
                  watch2025.org
                </div>
              </div>
            </div>
          </div>
        `,
        {
          width: 1200,
          height: 630,
          fonts: fonts,
        }
      );
      
      // Convert SVG to PNG
      const slug = path.basename(file, path.extname(file));
      const outputPath = path.join(ogDir, `${slug}.png`);
      
      await sharp(Buffer.from(svg))
        .png()
        .toFile(outputPath);
        
      console.log(`Generated OG image: ${outputPath}`);
    }
  }
}

try {
  await generateOGImages();
  console.log('OG image generation completed successfully');
} catch (error) {
  console.error('Error generating OG images:', error);
  process.exit(1);
}