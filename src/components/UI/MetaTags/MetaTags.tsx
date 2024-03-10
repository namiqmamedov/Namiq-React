const MetaTags = (blog:any) => {
    if (blog) {
      document.title = `${blog.name} | Namiq`;

      const ogtitle = document.querySelector('meta[property="og:title"]');
      ogtitle?.setAttribute('content', `${blog.name}`);
  
      const ogtype = document.querySelector('meta[property="og:type"]');
      ogtype?.setAttribute('content', 'article');
  
      const ogurl = document.querySelector('meta[property="og:url"]');
      ogurl?.setAttribute('content', window.location.href);
  
      const head = document.head;
  
      let ogImage = document.querySelector('meta[property="og:image"]');
      if (!ogImage) {
        ogImage = document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        head.appendChild(ogImage);
      }
      ogImage.setAttribute('content', blog.pictureUrl);
  
      let twitterCard = document.querySelector('meta[name="twitter:card"]');
      if (!twitterCard) {
        twitterCard = document.createElement('meta');
        twitterCard.setAttribute('name', 'twitter:card');
        head.appendChild(twitterCard);
      }
      twitterCard.setAttribute('content', 'summary_large_image');
  
      let twitterDomain = document.querySelector('meta[property="twitter:domain"]');
      if (!twitterDomain) {
        twitterDomain = document.createElement('meta');
        twitterDomain.setAttribute('property', 'twitter:domain');
        head.appendChild(twitterDomain);
      }
      twitterDomain.setAttribute('content', 'namiq.net');
  
      let twitterUrl = document.querySelector('meta[property="twitter:url"]');
      if (!twitterUrl) {
        twitterUrl = document.createElement('meta');
        twitterUrl.setAttribute('property', 'twitter:url');
        head.appendChild(twitterUrl);
      }
      twitterUrl.setAttribute('content', 'https://namiq.net');
  
      let twitterTitle = document.querySelector('meta[property="twitter:title"]');
      if (!twitterTitle) {
        twitterTitle = document.createElement('meta');
        twitterTitle.setAttribute('property', 'twitter:title');
        head.appendChild(twitterTitle);
      }
      twitterTitle.setAttribute('content', blog.name);
  
      const description = document.querySelector('meta[name="description"]');
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (description) {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = blog.description.text;
  
        const tag = tempElement.querySelector('p');
  
        if (tag) {
          const descriptionText = tag.textContent;
          description.setAttribute('content', `${descriptionText}`);
          ogDescription?.setAttribute('content', `${descriptionText}`);
  
          let twitterDescription = document.querySelector('meta[name="twitter:description"]');
        
          if (!twitterDescription) {
            twitterDescription = document.createElement('meta');
            twitterDescription.setAttribute('name', 'twitter:description');
            head.appendChild(twitterDescription);
          }
          twitterDescription.setAttribute('content', `${descriptionText}`);
        }
      }
  
      let twitterImage = document.querySelector('meta[property="twitter:image"]');
      if (!twitterImage) {
        twitterImage = document.createElement('meta');
        twitterImage.setAttribute('property', 'twitter:image');
        head.appendChild(twitterImage);
      }
      twitterImage.setAttribute('content', blog.pictureUrl);
    }
  };
  
  export default MetaTags;
  