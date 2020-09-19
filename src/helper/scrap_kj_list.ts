import cheerio from 'cheerio';
import axios from 'axios';

let isLink = (el: CheerioElement) => {
  return 'a' === el.name;
};

const main = async () => {
  let data = await axios.get(`https://alkitab.mobi/kidung/kj`);
  let htmlData = data.data;

  const regex: RegExp = /\d+/;

  let $ = cheerio.load(htmlData);
  let a = $('p.paragraphtitle');
  let c = a.nextUntil('p');

  let songs = [];

  c.each((_, v: CheerioElement) => {
    if (isLink(v)) {
      let title = v.children[0].data;
      let link = v.attribs['href'];
      let [id] = link.match(regex);
      let song = {
        id,
        title
      };

      songs.push(song);
    }
  });

  return songs;
};

export default main;
