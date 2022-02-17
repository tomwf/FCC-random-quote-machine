import { useState, useEffect } from 'react'
import { FaQuoteLeft, FaTwitter } from 'react-icons/fa'
import $ from 'jquery'

const QuoteBox = () => {
  function randomColor() {
    const hue = Math.floor(Math.random() * 360 + 1)
    const saturation = 77
    const lightness = 72

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  }

  function applyColor() {
    // Change color
    $('body').css('background-color', color)
    $('.btn').each(function () {
      $(this).css('background-color', color)
    })
    $('#text').css('color', color)
    $('#author').css('color', color)
  }

  function fadeIn(duration) {
    $('#text').fadeIn(duration)
    $('#author').fadeIn(duration)
  }

  function fadeOut(duration) {
    $('#text').fadeOut(duration)
    $('#author').fadeOut(duration)
  }

  async function fetchQuote() {
    const response = await fetch('https://type.fit/api/quotes')
      .then(res => res.json())
    const randomQuote = response[Math.floor(Math.random() * response.length)]

    // Smooth text transition
    setTimeout(() => {
      setQuote({ text: randomQuote.text, author: randomQuote.author })
    }, 700)
    fadeIn(800)
  }

  const [color, setColor] = useState(randomColor())
  const [quote, setQuote] = useState({ text: '', author: '' })

  useEffect(() => {
    // Random color
    setColor(randomColor())
    applyColor()

    // Random quote
    fetchQuote()

    // workaround to prevent build from failing
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getNewQuote = () => {
    // Update color
    setColor(randomColor())
    applyColor()

    // Update text
    fadeOut(800)
    fetchQuote()
  }

  return (
    <div id="quote-box">
      <div id="quote-text">
        <span id="text"><FaQuoteLeft />{quote.text}</span>
      </div>
      <p id="author">{quote.author ? '- ' + quote.author : ''}</p>
      <div>
        <a id="tweet-quote" className="btn" href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${quote.text}`}><FaTwitter /></a>
        <button id="new-quote" className="btn" onClick={getNewQuote}>New quote</button>
      </div>
    </div>
  )
}

export default QuoteBox
