// components/InstagramEmbed.js
import { useEffect } from 'react';

const InstagramEmbed = ({ embedUrl }) => {
  useEffect(() => {
    // Dynamically load Instagram's embed script
    const script = document.createElement('script');
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Clean up script after use
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <blockquote
      className="instagram-media w-[350px] md:w-[550px] h-[315px] md:h-[415px] rounded-3xl"
      data-instgrm-permalink={embedUrl}
      data-instgrm-version="14"
      style={{
        background: '#FFF',
        boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
      }}
    ></blockquote>
  );
};

export default InstagramEmbed;