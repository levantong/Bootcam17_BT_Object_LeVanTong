//xóa log

console.clear();

//lấy lại danh sách sản phẩm từ local Storage
var danhSachSP = JSON.parse(localStorage.getItem("DSSP"));

//Thêm SP:
var themSP = function () {

    //lấy thông tin nhập vào
    var TenSP = document.getElementById("TenSP").value;
    var GiaSP = document.getElementById("GiaSP").value;
    var HinhSP = document.getElementById("HinhSP").value;
    var MoTa = document.getElementById("MoTa").value;
    //tạo sản phẩm từ thông tin nhập vào
    var nv = {
        ten: TenSP,
        gia: GiaSP,
        hinh: HinhSP,
        moTa: MoTa,
    }
    //thêm sp mới tạo vào mảng ds
    danhSachSP.push(nv);
    //lưu danh sách SP vào localStorage
    localStorage.setItem("DSSP", JSON.stringify(danhSachSP));
    //hiện lại ds sản phẩm
    renderListSP(danhSachSP);
    //thông báo cho người dùng biết đã thêm thành công
    alert("Thêm sản phẩm thành công!");
    //tắt modal
    document.getElementById("btnDong").click();

}
//Tạo hàm render hiện sản phẩm từ mảng danh sách SP
var renderListSP = function (dssp) {
    var inner = "";
    dssp.forEach(function (sp) {
        inner += `<tr>
            <td>${dssp.indexOf(sp) + 1}</td>
            <td>${sp.ten}</td>
            <td>${sp.gia}</td>
            <td><img src="${sp.hinh}" alt="" height="50px"></td>
            <td>${sp.moTa}</td>
            <td>
            <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#myModal" onclick="suaSP(${dssp.indexOf(sp)})">Sửa</button>
            <button type="button" class="btn btn-danger" onclick="xoaSP(${dssp.indexOf(sp)})">Xóa</button>
            </td>
        </tr>
        `
    })
    document.getElementById("tblDanhSachSP").innerHTML = inner;
}

renderListSP(danhSachSP);
document.getElementById("btnThemNV").onclick = themSP;
//hàm xóa sản phẩm
var xoaSP = function (index) {
    danhSachSP.splice(index, 1);
    alert(`Xóa sản phẩm thứ ${index+1} thành công!`);
    renderListSP(danhSachSP);
    localStorage.setItem("DSSP", JSON.stringify(danhSachSP));

}

//hàm sửa sản phẩm
var suaSP = function (index) {
    //hiện lại thông tin sp cần edit trên modal
    document.getElementById("TenSP").value = danhSachSP[index].ten;
    document.getElementById("GiaSP").value = danhSachSP[index].gia;
    document.getElementById("HinhSP").value = danhSachSP[index].hinh;
    document.getElementById("MoTa").value = danhSachSP[index].moTa;
    //enabled lại nút Thêm Sản phẩm sau khi đã cập nhật thông tin

    document.getElementById("btnThemNV").disabled = true;
    //lưu index của sp cần sửa thông tin vào localStorage để dùng cho khi nhấn nút cập nhật sp (do giao diện đề không quản lý theo mã SP nên không dùng findIndex để tìm thứ tự sp cần edit)
    localStorage.setItem("indexSPCanEdit",index)
}

var capNhatSP = function(){
    //lấy thông tin nhập vào
    var TenSP = document.getElementById("TenSP").value;
    var GiaSP = document.getElementById("GiaSP").value;
    var HinhSP = document.getElementById("HinhSP").value;
    var MoTa = document.getElementById("MoTa").value;

    var indexSPCanEdit = localStorage.getItem("indexSPCanEdit");

    //cập nhật lại thông tin Sp cần edit
    danhSachSP[indexSPCanEdit] = {
        ten: TenSP,
        gia: GiaSP,
        hinh: HinhSP,
        moTa: MoTa,
    };
    //lưu danh sách SP đã cập nhật vào localStorage
    localStorage.setItem("DSSP", JSON.stringify(danhSachSP));
    //hiện lại ds sản phẩm sau cập nhật
    renderListSP(danhSachSP);
    //thông báo cho người dùng biết đã thêm thành công
    alert("Thêm sản phẩm thành công!");
    //tắt modal
    document.getElementById("btnDong").click();
    //thông báo thành công
    alert(`Thay đổi thông tin sản phẩm thứ ${index+1} thành công!`);
    //enabled lại nút Thêm Sản phẩm sau khi đã cập nhật thông tin
    document.getElementById("btnThemNV").disabled = false;
}
document.getElementById("btnCapNhat").onclick = capNhatSP;

//enabled lại nút Thêm Sản phẩm khi nhấn thêm mới SP
document.getElementById("btnThemSP").onclick = function(){
    document.getElementById("btnThemNV").disabled = false;
}
//hàm loại bỏ dấu tiếng việt, tham khảo tại: https://www.tunglt.com/2018/11/bo-dau-tieng-viet-javascript-es6/
function removeAccents(str) {
    return str.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}
var timSP = function(){
    //lấy thông tin nhập vào
    var inputTK = document.getElementById("inputTK").value;
    var keySearch = removeAccents(inputTK.toLowerCase().replace(/\s+/g, '')); //loại bỏ dấu TV và dấu cách, đổi sang chữ thường.
    //tạo mảng đã lọc theo từ khóa tìm kiếm, show mảng mới
    var filterSP = danhSachSP.filter(function(sp){
        return removeAccents(sp.ten.toLowerCase().replace(/\s+/g, '')).includes(keySearch)
    });
    renderListSP(filterSP);
}
document.getElementById("inputTK").addEventListener("input", timSP);