import React from 'react';

const NotFoundPage: React.FC = () => {
  const getBrowserDimensions = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width <= 500) {
        return { width: '320px', height: '220px', fontSize: '60px' };
      } else if (width <= 750) {
        return { width: '380px', height: '250px', fontSize: '72px' };
      }
    }
    return { width: '420px', height: '280px', fontSize: '96px' };
  };

  const dimensions = getBrowserDimensions();

  return (
    <div style={{
      minHeight: 'calc(100vh - 140px)', /* Header + Footer */
      backgroundColor: '#F6F7F7', /* Same as footer background */
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 0'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 40px',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0'
        }}>
          {/* Browser window mockup - responsive dimensions */}
          <div style={{
            width: dimensions.width,
            height: dimensions.height,
            border: '4px solid #4B5C68',
            borderRadius: '12px',
            backgroundColor: '#FFFFFF',
            position: 'relative',
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
            maxWidth: '90vw'
          }}>
            {/* Browser header */}
            <div style={{
              height: '40px',
              backgroundColor: '#E4EDF2',
              borderRadius: '8px 8px 0 0',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '16px',
              gap: '8px',
              borderBottom: '2px solid #d0d7de'
            }}>
              <div style={{ 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                backgroundColor: '#ff5f57' 
              }}></div>
              <div style={{ 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                backgroundColor: '#ffbd2e' 
              }}></div>
              <div style={{ 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                backgroundColor: '#28ca42' 
              }}></div>
            </div>
            
            {/* Browser content - 404 */}
            <div style={{
              height: 'calc(100% - 40px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFFFFF'
            }}>
              <img 
                src="/assets/404.svg" 
                alt="404 Not Found"
                style={{
                  maxWidth: '80%',
                  maxHeight: '80%',
                  objectFit: 'contain'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;