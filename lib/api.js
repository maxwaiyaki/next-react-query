import ky from 'ky-universal';

const fetchMusic = async () => {
  const parsed = await ky(
    'https://api-v2.mookh.com/digital_content/album/public/?media_type_name=MUSIC%20SINGLE&fields=id,name,store_name,thumbnail_frontend,thumbnail,media_type_name,category_name,category_type_name,slug,publish_date',
  ).json();
  // console.log(parsed);
  return parsed.results;
};

export { fetchMusic };
