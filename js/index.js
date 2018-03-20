let varr = null

let openCloseMenu = function(event) {
  event.preventDefault();
  $("#wrapper").toggleClass("toggled");
}

let actionMenu = function(event) {
  let variavel = event.target;
  let tag = null;

  if ($(variavel).prop("tagName") == "A") {
    tag = $(variavel);
  } else {
    tag = $(variavel).parents("a.link-menu");
  }

  let menu = JSON.parse(localStorage.getItem('menu'));
  let id = $(variavel).parents('li.treeview').attr('data-id');
  let padding = $(variavel).parents('li.treeview').attr('data-padding');
  let sub = menu.filter(item => item.id == id).map(item => item);
  if (sub.length != 0) {
    event.preventDefault();
    let ids = sub[0].sub.map(item => `.li-${item.id}`).join(`,`);
    padding = parseInt(padding) + 15;

    if ($(ids).length == 0) {

      let menuIds = menu.filter(item => typeof item.id != 'undefined').map(item => item.id)
      let str = sub[0].sub.map(item => {

        let str = null;
        let redirect = null;
        if (menuIds.indexOf(item.id) == -1) {
          str = ``;
          redirect = `/sistema/${item.controller}-${item.acao}`;
        } else {
          redirect = `#`;
          str = `<span class="pull-right pull-right-menu">
                  <span class="glyphicon glyphicon-chevron-left rotate"></span>
                 </span>`;
        }

        str = `<li class="treeview li-${item.id}" data-id="${item.id}" data-padding="${padding}">
          <a href="${redirect}" style="padding-left: ${padding}px" onclick="actionMenu(event)">
            ${item.descricao}
            ${str}
          </a>
        <li>`;

        return str;
      }).join(``);

      str = `<ul>${str}</ul>`;
      $(str).insertAfter(tag).parent("li.treeview").find("ul").hide();
    }

    $(tag).find("span.rotate").toggleClass("down")
    $(tag).parent("li.treeview").find("ul").slideToggle("slow");
  }
}