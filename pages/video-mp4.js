import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';


// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

function App() {
    const onInit = () => {
        console.log('lightGallery has been initialized');
    };
    return (
        <div className="App">
            <LightGallery
                onInit={onInit}
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
            >
        <a href="video1.mp4" data-video='{"sources": [{"src": "video1.mp4", "type": "video/mp4"}], "attributes": {}}'>
  <img alt="Video thumbnail" src="1.gif" />
</a>
                
            </LightGallery>
        </div>
    );
}

export default App;