const head = '/api'
module.exports = {
  // 正在热映
  now: head + '/getNowPlayingFilmList',
  // 即将上映
  soon: head + '/getComingSoonFilmList',
  // 城市
  city: head + '/getCitiesInfo',
  // 电影详情
  detail: head + '/getFilmInfo',
  // 影院列表
  cinema: head + '/getCinemaList',
  // 影院详情
  info: head + '/getCinemaInfo',
  // 影院排片
  films: head + '/getCinemaFilmsArrangement',
  // 影片场次
  times: head + '/getCinemaFilmSchedules'
}
