const template = require('./template');
const header = template.header();

module.exports.listUser = function(navBar, menuLink, userObj) {
    let users = '';
    for (user of userObj) {
        users += `
            <tr>
                <td>${user.uid}</td>
                <td><a href="/user/${user.name}.html">${user.name}</a></td>
                <td>${user.deptName}</td><td>${user.tel}</td><td>${user.ts}</td>
                <td><a href="/user/update/uid/${user.uid}"><i class="fas fa-edit"></i></a>&nbsp;&nbsp;
                    <a href="/user/delete/uid/${user.uid}"><i class="fas fa-trash-alt"></i></td>
            </tr>`;
    }
    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    ${header}
</head>
<body>
    <div class="container">
        ${navBar}
        <div class="row" style="margin-top: 30px">
            <div class="col-2">
                ${menuLink}
            </div>
            <div class="col-10">
                <div class="row" style="margin-left: 10px">
                    <div class="col-12"><h3>사용자 조회</h3></div>
                    <div class="col-12"><hr></div>
                    <div class="col-11">
                        <table class="table table-condensed table-hover">
                            <thead class="thead-light">
                                <tr class="active">
                                    <th scope="col">아이디</th><th scope="col">이름</th>
                                    <th scope="col">부서</th><th scope="col">전화번호</th>
                                    <th scope="col">등록일자</th><th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${users}
                            </tbody>
                        </table>
                    </div>
                    <div class="col-1"></div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    `;
}