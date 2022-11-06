const xhr = new XMLHttpRequest()

// https://www.duitang.com
xhr.open('GET', '/dt/napi/blog/list/by_filter_id/?include_fields=top_comments%2Cis_root%2Csource_link%2Citem%2Cbuyable%2Croot_id%2Cstatus%2Clike_count%2Csender%2Calbum%2Creply_count&filter_id=%E7%BE%8E%E9%A3%9F%E8%8F%9C%E8%B0%B1&start=24&_=1667715151496')

xhr.send()

xhr.onload = function() {
  console.log(JSON.parse(xhr.responseText))
}