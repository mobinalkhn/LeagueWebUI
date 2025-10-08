'use client';

export default function TestNotFound() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.browserWindow}>
          <div style={styles.browserHeader}>
            <div style={styles.browserButtons}>
              <div style={styles.dot}></div>
              <div style={styles.dot}></div>
              <div style={styles.dot}></div>
            </div>
          </div>
          <div style={styles.browserBody}>
            <div style={styles.errorCode}>404</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: 'calc(100vh - 120px)',
    backgroundColor: '#F0F0F0',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px',
    position: 'relative' as const,
  },
  
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  
  browserWindow: {
    width: '400px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    border: '3px solid #333333',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  
  browserHeader: {
    backgroundColor: '#333333',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '15px',
  },
  
  browserButtons: {
    display: 'flex',
    gap: '8px',
  },
  
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: '#CCCCCC',
  },
  
  browserBody: {
    height: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  
  errorCode: {
    fontSize: '120px',
    fontWeight: '900',
    color: '#333333',
    fontFamily: 'Open Sans, sans-serif',
    letterSpacing: '-8px',
    textAlign: 'center' as const,
  },
  
  apiVersion: {
    position: 'absolute' as const,
    bottom: '20px',
    right: '20px',
    color: '#4B5C68',
    fontSize: '11px',
    fontFamily: 'Open Sans, sans-serif',
    opacity: 0.7,
  },
};