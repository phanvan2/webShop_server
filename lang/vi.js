export const transValidation = {
    data_empty: "Vui lòng nhập lại thông tin của bạn",
    category_exists: "Phân loại sản phẩm này đã tồn tại" 

    
};

export const transSuccess = {
    login_user: "Đăng nhập thành công", 
    register_user: (username) => {
        return `Tài khoản <b>${username}</b> đã được tạo thành công`; 
    },
    addNewCategory: (nameCategory) => {
        return `Phân loại <b> ${nameCategory}</b> đã được thêm thành công`;
    },
    addNewProduct: "Thêm sản phẩm thành công",
    updateUser: "Cập nhật thông tin người dùng thành công",
    uploadImg: "Đã tải ảnh lên thành công",
    updateProduct: "Cập nhật sản phẩm thành công"
    

}; 

export const transError = {
    login_user: "Đăng nhập thất bại.", 
    register_user: "Đăng ký thất bại.",

    getCategory: "Không tìm thấy dữ liệu.",
    upImage: "Lỗi không tải ảnh lên được.", 
    addNewCategory: (nameCategory) => {
        return `Thêm phân loại </b>${nameCategory}</b> thất bại.`;
    },
    addNewProduct: "Thêm sản phẩm thất bại, Vui lòng thử lại sau.",
    product_detail: "Rất tiếc chúng tôi không tìm thấy sản phẩm này.",
    error_data: "Rất tiếc, đã xảy ra lỗi. Vui lòng kiểm tra lại đầu vào.",
    updateUser: "Cập nhật thông tin người dùng thất bại",
    uploadImg: "Lỗi khi tải ảnh lên",
    updateProduct: "Cập nhật sản phẩm thất bại",

}
