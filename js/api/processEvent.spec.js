import processEvent from './processEvent'

const rawEventData = {
  abstract: 'Talk Abstract',
  category: 'SCI',
  detailed_description: 'Talk Description',
  language: 'ZHZH',
  python_level: 'EXPERIENCED',
  recording_policy: true,
  slide_link: 'https://path/to/slide',
  speakers: [
    {
      bio: 'Don Quixote 來自於台灣',
      email: 'my@example.com',
      facebook_profile_url: '',
      github_id: 'don-quixote',
      photo_url: 'http://placeholder.io/some.png',
      speaker_name: 'Don Quixote',
      twitter_id: ''
    }
  ],
  title: 'Talk Title'
}

const processedEventData = {
  description: 'Talk Description',
  level: 'EXPERIENCED',
  recording: true,
  slideLink: 'https://path/to/slide',
  speakers: [
    {
      facebookURL: '',
      githubId: 'don-quixote',
      photoURL: 'http://placeholder.io/some.png',
      name: 'Don Quixote',
      twitterId: '',
      bio: 'Don Quixote 來自於台灣',
      email: 'my@example.com'
    }
  ],
  abstract: 'Talk Abstract',
  category: 'SCI',
  talkLanguage: 'ZH',
  slideLanguage: 'ZH',
  title: 'Talk Title'
}

it('Should convert raw event', () => {
  const processed = processEvent(rawEventData)
  expect(processed).toEqual(processedEventData)
})
