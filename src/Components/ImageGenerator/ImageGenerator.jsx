import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import default_img from "../Assets/default_image.svg";
import OpenAI from "openai";
export const ImageGenerator = () => {
  const [Image_url, setImage_url] = useState("/");
  const [loading, setLoading] = useState(false);

  const api_key = process.env.REACT_APP_API_KEY;
  const openai = new OpenAI({ apiKey: api_key, dangerouslyAllowBrowser: true });
  console.log(api_key);
  let inputRef = useRef(null);
  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setLoading(true);
    // const response = await fetch(
    //   "https://api.openai.com/v1/images/generations",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + api_key,
    //       "User-Agent": "Chrome",
    //     },
    //     body: JSON.stringify({
    //       prompt: `${inputRef.current.value}`,
    //       model: "dall-e-3",
    //       n: 1,
    //       size: "512x512",
    //     }),
    //   }
    // );
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `${inputRef.current.value}`,
      n: 1,
      size: "1024x1024",
    });
    // image_url = response.data[0].url;
    // let data = await response.json();
    // console.log(data);
    // let data_array = data.data;
    setImage_url(response.data[0].url);
    setLoading(false);
  };
  return (
    <div className="ai-image-generator">
      <div className="header">
        AI Image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={Image_url === "/" ? default_img : Image_url} alt="" />
          <div className="loading">
            <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
            <div className={loading ? "loading-text" : "display-none"}>
              Loading....
            </div>
          </div>
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe what you want to see"
        />
        <div
          className="generate-btn"
          onClick={() => {
            imageGenerator();
          }}
        >
          Generate
        </div>
      </div>
    </div>
  );
};
