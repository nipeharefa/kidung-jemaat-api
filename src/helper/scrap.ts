import cheerio from 'cheerio';
import axios from 'axios';

interface LyricStruct {
  element: string;
  content: string;
}

interface Song {
  title: string;
  lyrics: Array<LyricStruct>;
  id: number;
}

const sanitazeCherElement = (
  $: CheerioStatic,
  e: CheerioElement
): Array<string> => {
  let t = $(e).text();

  let b = t.split('\n');

  b = b
    .filter((v) => v !== '')
    .map((v: string): string => {
      return v.trim();
    })
    .filter((v) => v !== '')
    .filter((v) => v != 'Play');

  return b;
};

const convertToSongStruct = (a: Array<string>): LyricStruct => {
  let el: string = 'verse';

  if (a[0] === 'Reff:') {
    el = 'reff';
  }

  let obj: LyricStruct = {
    element: el,
    content: a[1]
  };

  return obj;
};

const main = async (id: string) => {
  try {
    let data = await axios.get(`https://alkitab.mobi/kidung/kj/${id}`);
    let htmlData = data.data;

    let $ = cheerio.load(htmlData);
    let a = $('p.paragraphtitle');
    let cc = a.nextUntil('hr');

    let title: string = $('title')
      .text()
      .replace(/KJ\s([0-9]{1,3}\s-\s)/, '');

    let idNumber = parseInt(id) || 0;

    let song: Song = {
      title: '',
      lyrics: [],
      id: idNumber
    };

    song.title = title;

    cc.each((_, v) => {
      $(v).each((_, e) => {
        let b = sanitazeCherElement($, e);

        if (b.length > 0) {
          let ss = convertToSongStruct(b);
          song.lyrics.push(ss);
        }
      });
    });

    return song;
  } catch (error) {
    if (process.env.NODE_ENV != 'production') {
      throw error;
    }
  }

  return {};
};

export default main;
