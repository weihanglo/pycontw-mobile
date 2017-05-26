export default function (event) {
  const {
    detailed_description: description,
    python_level: level,
    recording_policy: recording,
    slide_link: slideLink,
    speakers,
    ...others
  } = event

  const allSpeakers = speakers.map(({
    facebook_profile_url: facebookURL,
    github_id: githubId,
    photo_url: photoURL,
    speaker_name: name,
    twitter_id: twitterId,
    ...remains
  }) => {
    return {
      facebookURL,
      githubId,
      photoURL,
      name,
      twitterId,
      ...remains
    }
  })

  return {
    description,
    level,
    recording,
    slideLink,
    speakers: allSpeakers,
    ...others
  }
}
