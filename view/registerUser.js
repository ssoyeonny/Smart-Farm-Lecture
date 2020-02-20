const template = require('./template');
const header = template.header();

module.exports.registerUser = function(navBar, menuLink, deptObj) {
    let options = '';
    for (deptItem of deptObj) {
        options += `<option value="${deptItem.did}">${deptItem.name}</option>`;
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
                    <div class="col-12"><h3>사용자 등록</h3></div>
                    <div class="col-12"><hr></div>
                    <div class="col-2"></div>
                    <div class="col-7">
                        <form action="/user/register" method="POST">
                            <table class="table table-borderless">
                                <tr>
                                    <td>아이디</td>
                                    <td><input type="text" class="form-control" id="uid" name="uid"></td>
                                </tr>
                                <tr>
                                    <td><span style="color:blue"></span>패스워드</td>
                                    <td><input type="password" class="form-control" id="pswd" name="pswd"></td>
                                </tr>
                                <tr>
                                    <td><span style="color:blue"></span>패스워드 확인</td>
                                    <td><input type="password" class="form-control" id="pswd2" name="pswd2"></td>
                                </tr>
                                <tr>
                                    <td>이름</td>
                                    <td><input type="text" class="form-control" id="name" name="name"></td>
                                </tr>
                                <tr>
                                    <td>부서명</td>
                                    <td>
                                        <select class="form-control" id="dept" name="dept">
                                            ${options}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>전화번호</td>
                                    <td><input type="text" class="form-control" id="tel" name="tel"></td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="text-align: center;">
                                        <button type="submit" class="btn btn-primary">등록</button>&nbsp;&nbsp;
                                        <button type="reset"" class="btn btn-secondary">취소</button>
                                    </td>
                                </tr>
                            </table>
                        </form>
                    </div>
                    <div class="col-3"></div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    `;
}