import React from "react";
import Link from "next/link";

const Home = () => {
  const cards = [
    { title: "Mua Hàng", text: "Chọn sản phẩm và thực hiện quá trình mua hàng từ nhà cung cấp.", link: "/material", image: "http://www.elleman.vn/wp-content/uploads/2015/12/24/mua-hang-online-5.jpg" },
    { title: "Tạo Đơn Hàng", text: "Tạo đơn hàng mới cho khách hàng.", link: "#create-order", image: "https://file1.dangcongsan.vn/data/0/images/2021/11/29/kimdung/dong-luc-tmdt-1.jpg" },
    { title: "Sản Xuất", text: "Xem các công thức vật liệu sản xuất sản phẩm.", link: "/Manufacture", image: "https://brademar.com/wp-content/uploads/2022/10/Danh-muc-san-pham-cua-Samsung.jpg" },
    { title: "Quản Lý Tồn Kho", text: "Kiểm tra và quản lý hàng tồn kho.", link: "/Inventory", image: "https://simerp.io/wp-content/uploads/2021/04/quan-ly-hang-ton-kho.png" },
    { title: "Vận Chuyển", text: "Quản lý và theo dõi thông tin vận chuyển.", link: "#shipping", image: "https://cdn.luatminhkhue.vn/lmk/articles/11/55524/van-chuyen-hang-hoa-la-gi-vai-tro-va-dac-diem-co-ban-cua-hoat-dong-van-chuyen-hang-hoa-55524.jpg" },
    { title: "Nhà Cung Cấp", text: "Quản lý thông tin các nhà cung cấp.", link: "/supplier", image: "https://simerp.io/wp-content/uploads/2021/07/su-dung-phan-mem-quan-ly-nha-cung-cap.jpg" }
  ];

  const chunkArray = (array: any[], chunkSize: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const groupedCards = chunkArray(cards, 3);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold text-center mb-8">Chọn Chức Năng Quản Lý</h2>
      <div className="carousel">
        {groupedCards.map((group, index) => (
          <div key={index} className="carousel-item">
            <div className="flex justify-center space-x-8">
              {group.map((card, idx) => (
                <div key={idx} className="w-1/3 p-4">
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{card.title}</h3>
                      <p className="text-gray-600">{card.text}</p>
                      <Link href={card.link} className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">
                        Xem Thêm
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
