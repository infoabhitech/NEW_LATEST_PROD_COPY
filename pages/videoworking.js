import images from "./images";
import ImageSlider from "./ImageSlider";

const App = () => {
    return (
        <div className="App">
            <ImageSlider images={images} />
        </div>
    );
};

export default App;