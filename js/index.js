const URL = 'http://localhost:8080/tweets'

/**
 * Call getTwitterData() function by pressing enter
 */
const onEnter = (e) => {
  if (e.key == 'Enter') {
    getTwitterData()
  }
}

/**
 * Retrieve Twitter Data from API
 */
const getTwitterData = () => {
  const query = document.getElementById('user-search-input').value
  if (!query) return
  const encodedQuery = encodeURIComponent(query)
  const fullUrl = `${URL}?query=${encodedQuery}&max_results=10`
  fetch(fullUrl)
    .then((response) => {
      //   console.log('response:', response)
      return response.json()
    })
    .then((data) => {
      buildTweets(data.data)
    })
}

/**
 * Save the next page data
 */
const saveNextPage = (metadata) => {}

/**
 * Handle when a user clicks on a trend
 */
const selectTrend = (e) => {}

/**
 * Set the visibility of next page based on if there is data on next page
 */
const nextPageButtonVisibility = (metadata) => {}

/**
 * Build Tweets HTML based on Data from API
 */
const buildTweets = (tweets, nextPage) => {
  let twitterContent = ''
  tweets.map((tweet) => {
    twitterContent += `
        <div class="tweet-container">
            <div class="tweet-user-info">
                <div class="tweet-user-avatar">

                </div>
                <div class="tweet-user-data">
                    <div class="tweet-user-name">
                        Jos&eacute; V&aacute;zquez
                    </div>
                    <div class="tweet-user-handle">
                        @eltwdejose
                    </div>
                </div>
            </div>
     `
        if (tweet.includes && tweet.includes.media.length > 0) {
          twitterContent += buildImages(tweet.includes.media);
        }
    twitterContent += `
            <div class="tweet-text-container">
                ${tweet.text}
            </div>
            <div class="tweet-date-container">
                20 hours ago
            </div>
        </div>        
     `
  })
  document.querySelector('.tweets-list').innerHTML = twitterContent
}

/**
 * Build HTML for Tweets Images
 */
const buildImages = (mediaList) => {
    let imagesContent = `<div class="tweet-images-container">`;
    let imageExists = false;
    mediaList.map((media) => {
      if (media.type == "photo") {
        imageExists = true;
            imagesContent += `div class="tweet-image" style="background-image: url(${media.preview_image_url})"></div>`
        }
    });
    imagesContent += `</div>`
    return imageExists ? imagesContent : '';
}

/**
 * Build HTML for Tweets Video
 */
const buildVideo = (mediaList) => {}
