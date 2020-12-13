import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './SlickSlider.module.css'

const SlickSlider = ({ images }) => {
  const [nav1, setNav1] = useState(null)
  const [nav2, setNav2] = useState(null)
  const [slider1, setSlider1] = useState(null)
  const [slider2, setSlider2] = useState(null)

  useEffect(() => {
    setNav1(slider1)
    setNav2(slider2)
  }, [images])

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true,
    fade: true,
    asNavFor: '.slider-nav',
    lazyLoad: 'ondemand'
  }

  const settingsThumbs = {
    slidesToShow: 3,
    asNavFor: '.slider-for',
    focusOnSelect: true,
    infinite: false,
    variableWidth: true
  }

  return (
    <>
      <Slider {...settingsMain} asNavFor={nav2} ref={(slider) => setSlider1(slider)}>
        {images.map((image) => (
          <div key={image.id}>
            <img src={image.src} className={styles.mainImage} alt={image.alt} />
          </div>
        ))}
      </Slider>
      <div className={styles.thumbnailSliderWrap}>
        <Slider {...settingsThumbs} asNavFor={nav1} ref={(slider) => setSlider2(slider)}>
          {images.map((image) => (
            <div className={styles.slickSlide} key={image.id}>
              <img className={styles.slickSlideImg} src={image.src} alt={image.alt} />
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
}

export default SlickSlider
