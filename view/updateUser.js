const template = require('./template');
const header = template.header();

module.exports.updateUser = function(navBar, menuLink, depts, user) {
    let options = '';
    for (dept of depts) {
        if (dept.did === user.deptId)
            options += `<option value="${dept.did}" selected>${dept.name}</option>`;
        else
            options += `<option value="${dept.did}">${dept.name}</option>`;
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
                    <div class="col-12"><h3>사용자 수정</h3></div>
                    <div class="col-12"><hr></div>
                    <div class="col-2"></div>
                    <div class="col-7">
                        <form action="/user/update" method="POST">
                            <input type="hidden" name="uid" value="${user.uid}">
                            <table class="table table-borderless">
                                <tr>
                                    <td>아이디</td>
                                    <td>${user.uid}</td>
                                </tr>
                                <tr>
                                    <td>현재 패스워드</td>
                                    <td><input type="password" class="form-control" name="oldPswd">
                                        <input type="checkbox" value="1" name="changePswd"> 패스워드 변경시 체크</td>
                                </tr>
                                <tr>
                                    <td>신규 패스워드</td>
                                    <td><input type="password" class="form-control" name="pswd"></td>
                                </tr>
                                <tr>
                                    <td>신규 패스워드 확인</td>
                                    <td><input type="password" class="form-control" name="pswd2"></td>
                                </tr>
                                <tr>
                                    <td>이름</td>
                                    <td><input type="text" class="form-control" name="name" value="${user.name}"></td>
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
                                    <td><input type="text" class="form-control" name="tel" value="${user.tel}"></td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="text-align: center;">
                                        <button type="submit" class="btn btn-primary">수정</button>&nbsp;&nbsp;
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
//<img src="greenlogo.png" class="d-inline-block align-top" alt="">&nbsp;&nbsp;&nbsp;