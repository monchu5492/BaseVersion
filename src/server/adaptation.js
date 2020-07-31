import express from 'express';
import passport from 'passport/lib/index';
import session from 'express-session'; // github.com/expressjs/session
import { generalPromise } from './wildAlmondsPromise';

const router = express.Router();
router.use(passport.initialize());
router.use(session());

function formatDate(dateFound) {
  let formatDate;

  if (dateFound) {
    let i;
    const fixDate = dateFound.toString();
    const t1 = fixDate.split(/\s/);
    // console.log(t1);
    // for (i = 0; i < t1.length; i++) {
    //  console.log(`${i} => ${t1[i]}`);
    // }

    const prettyDate = {
      month: t1[1],
      date: t1[2],
      year: t1[3],
      time: t1[4],
      gmt: t1[5],
    };

    formatDate = `${t1[1]} ${t1[2]} ${t1[3]} ${t1[4]}`;
  } else {
    formatDate = '';
  }
  return (formatDate);
}

router.get('/checkvideo', (req, res) => {
  const getVideos = ('SELECT * FROM videos');
  let i;

  generalPromise(getVideos).then((payload) => {
    const videos = payload;
    console.log('\n\n\nVideos Videos Uploaded!!!!\n\n\n');
    for (i = 0; i < videos.length; i++) {
      const prettyDate = formatDate(videos[i].uploaded);
      // console.log(prettyDate);
      videos[i].date = prettyDate;
    }
    const sortVideos = videos.sort((a, b) => b.video_id - a.video_id);
    console.log(sortVideos);
    res.status(200).send(sortVideos);
  });
});

module.exports = router;
