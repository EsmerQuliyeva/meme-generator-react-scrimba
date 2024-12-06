import React from "react";

const Meme = () => {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/1b42wl.jpg",
  });
  const [allMemes, setAllMemes] = React.useState([]);
  React.useEffect(function () {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);
  function changeText(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({ ...prevMeme, [name]: value }));
  }
  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }
  return (
    <main>
      <div className="forms">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          onChange={changeText}
          name="topText"
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          onChange={changeText}
          name="bottomText"
        />
        <button onClick={getMemeImage}>Get a new meme image</button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} alt="meme-image" className="meme--image" />
        <h2 className="top-text">{meme.topText}</h2>
        <h2 className="bottom-text">{meme.bottomText}</h2>
      </div>
    </main>
  );
};

export default Meme;
