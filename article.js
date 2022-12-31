import fetch from "node-fetch";

// build article list
const slugList = [
  "Quang-cao-lan-san-vao-chinh-tri-va-bai-hoc-dat-gia-cho-Pepsi-WIrD4NJA2AT8",
  "Hay-tro-thanh-nguoi-ban-ghet-or-Tam-ly-hoc-Shadow-Phan-2-cP3a7ZTpuhyG",
  "Doc-sach-va-ti-ti-thu-thay-doi-cuoc-song-NREojarPHyhy",
  "Dan-loi-ngon-tu-Khi-nghe-thuat-ke-chuyen-la-cong-cu-huu-ich-cho-cuoc-song-Hj7dxCosvaJE",
  "Lam-sao-de-tu-choi-chuyen-ay-ma-khong-lam-doi-phuong-buon-long-VfsoZcSSk5zZ",
  "Best-books-to-read-when-you-high-8cci8sKV8jnU",
  "NGUON-GOC-CUA-MA-CA-RONG-XU-VIET-w4I06RORz35U",
  "THOI-DIEM-TOT-NHAT-DE-HOC-DATA-ANALYST-kr4HtLWMNJwW",
  "Fight-Club-1999-da-nhan-cach-va-linh-hon-phan-manh-jt8vQwXu0nsu",
  "Dung-nham-lan-giua-TED-va-TEDx-7xNjFEfvqK4S",
  "Hay-tro-thanh-nguoi-ban-ghet-or-Tam-ly-hoc-Shadow-Phan-1-CVoWciFObCy5",
  "4-Chi-phi-sinh-hoat-o-Nauy-co-dat-nhu-moi-nguoi-noi-Bel0qeHrJj61",
  "Du-con-mang-bo-dang-nao-thi-van-la-con-cua-me-fnNCGpCMUPUt",
  "SO-SAI-HAY-PHAI-LUON-DUNG-9NyadKEQqCtb",
  "Ba-duc-ket-tu-Seneca-Nhung-buc-thu-dao-duc-Cosgjy0HShCq",
  "No-luc-dang-duoc-ghi-nhan-cua-Warner-Bruh-voi-DCEU-8ivvnHpYSwp7",
  "AI-LA-NGUOI-PHU-HOP-VOI-CONG-VIEC-DATA-ANALYST-Phan-1-WNy1HqJVL4eT",
  "Close-to-you-ErTl45AeRcTC",
  "Chuyen-dang-duoc-1-chiec-video-YouTube-viral-album-Midnight-va-hanh-phuc-8yva8uWAOBm0",
  "TRI-TAM-TU-THAN-DIEM-GIAO-THOA-GIUA-KHOA-HOC-DONG-TAY-CvMPxMpPWEKi",
  "Giai-ma-nhung-dinh-kien-ve-doi-song-vo-chong-nPqKUU6ewbiQ",
  "Liquid-vs-Thunder-Awaken-Day-chinh-la-DotA-3SV2QLe8utbg",
  "Review-Vu-an-mang-ben-ho-Higashino-Keigo-e531Ue9KA2Au",
  "SPOILER-Danh-gia-ve-tap-10-season-1-cua-House-of-the-Dragon-iOkWi0Dz2aeC",
  "Ban-co-the-nhiem-HPV-tu-be-ngoi-toilet-khong-WwHZsiTlSe4G",
  "Nguoi-moi-ban-gi-tren-Shopee-j72vxHtPMmnS",
  "TAP-2-SENECA-NHUNG-BUC-THU-DAO-DUC-DOI-DIEN-VOI-NHUNG-MANG-MAU-TAM-TOI-CUA-CUOC-DOI-6lQT5N0ncEEt",
  "Tai-sao-chung-ta-thich-tinh-duc-va-chuyen-gi-dang-xay-ra-voi-nhung-nguoi-nghien-sex-Nl7imBYfq1Tt",
  "Tu-do-cua-con-cai-la-do-cha-me-dinh-doat-7yyOtFuMBYl5",
  "Ba-bai-hoc-tu-Nintendo-danh-cho-cac-nha-thiet-ke-ung-dung-Game-hoa-32ZWEQKa4Wu8",
  "Gen-Z-nen-quan-tam-gi-khi-quan-tam-den-tin-dung-CcsT14W9tNue",
  "Cung-duong-chay-doi-thuong-zRy4zgTiiFL5",
  "Ban-chua-thuong-ban-than-den-vay-dau-TVDKIb1LFzXs",
  "Tik-tok-va-Youtube-Chon-gi-cho-dung-khi-lam-thuong-hieu-ca-nhan-IwaRTN90X165",
  "30-TUOI-ROI-LIEU-LAM-DATA-ANALYST-CO-QUA-MUON-quAEFd1lGZAZ",
  "Viet-sach-khong-he-kho-KoXJSEwqjBr6",
  "4-phong-cach-nuoi-day-con-cai-ban-duoc-nuoi-day-boi-phong-cach-nao-EHESMhZvLgsb",
  "Thi-nghiem-con-rong-trong-gara-noi-len-dieu-gi-T6CYVah9KsrL",
  "Lieu-freelance-co-giet-chet-con-duong-su-nghiep-cua-lap-trinh-vien-rhJHjEYeKaaZ",
  "The-rubber-duck-Cho-minh-va-cho-nguoi-DLWZszzqI7Lb",
  "Neu-biet-tram-nam-la-huu-han-toi-da-khong-song-nhu-mot-chu-yeu-tinh-5nkJAgNUl6lg",
  "STOICISM-QandA-Sao-minh-khong-thu-Khac-Ky-cung-nhau-wGNZdoHXIU5u",
  "Batman-Begins-Khoi-Dau-Cua-Mot-Bieu-Tuong-ZuhTxfq3rTD1",
  "Bi-mat-tao-nen-phong-cach-thuyet-trinh-rieng-gol3UEt7vWUr",
  "Hoi-nho-uoc-mo-lam-nguoi-mau-lon-len-cao-1m48-AoeOODZ81fFQ",
  "Tai-sao-chung-ta-co-nhieu-hon-nhung-gi-dang-co-hD5oV3biKAxF",
  "Lam-thue-co-giau-duoc-khong-Tk1CMkQv8TS2",
  "CACH-NHO-LAU-NHUNG-KIEN-THUC-DA-HOC-JvKrwMUBzIMQ",
  "AM-ANH-BOI-PEER-PRESSURE-oQkyKVaK8Q1B",
  "Tuoi-tre-dau-tu-de-gi-giau-CosmazK9wA7D",
  "Lam-the-nao-de-tu-hoc-hieu-qua-phan-1-MksKiJNGAnBi",
  "Nghe-thuat-cua-thu-dam-theo-phong-cach-chanh-niem-cBlmzkrHqIeB",
  "Ma-con-gian-va-con-thuong-dlDpiV81zqHQ",
  "QUY-TRINH-CUOP-NHA-CON-TAM-DE-LAM-LUA-KIEN-THUC-CHUNG-iR8Ky4xmB4aD",
  "Howls-Moving-Castle-Ban-da-tim-thay-ban-than-minh-chua-5QKzkBHKgBn0",
  "CO-DON-DU-LAU-BAN-SE-CHET-p9Exn5IPk0i4",
  "Ban-ve-thi-nghiem-chui-rua-mot-cai-cay-TfvbrnrB7ERy",
  "Phat-giao-va-nhung-noi-dung-co-ban-Lyti6XMxvgRM",
  "NOI-BUON-LA-MOT-KIET-TAC-DEP-r9gYMksdybDH",
  "CLEVER-Game-hoa-tap-huan-doanh-nghiep-QlEtNPRshQ63",
  "Nhung-nguoi-phu-nu-tieu-bieu-trong-lich-su-Viet-Nam-3vmYDrB1umKI",
  "TUYET-VONG-BAT-NGUON-TU-THAT-BAI-CUA-TRI-TUONG-TUONG-E8kmjGnH2tOM",
  "Chinh-tri-hoa-tin-dung-va-vi-sao-hieu-biet-ve-kinh-te-hoc-trong-40-nam-qua-da-khong-con-phu-hop-Ke5xbFObZCR6",
  "TU-DO-LA-MOT-KHAI-NIEM-LY-TUONG-jyNB281qkwJc",
  "PHAN-BIET-DA-VA-BA-or-BAN-CO-DANG-NHAM-LAN-2-VI-TRI-NAY-QAIw3e5XmrEZ",
  "9-chu-de-luyen-viet-content-cho-nguoi-moi-bat-dau-41osQb64NLuw",
  "MO-KHOA-SANG-TAO-TAM-BIET-NHUNG-LAN-BI-Y-TUONG-fjd4SE9IRL1k",
  "Cam-on-ban-nguoi-doc-Seneca-VtcZ6oEUxnHB",
  "Dao-cua-Tap-Trung-va-cach-ban-khong-de-lang-phi-thoi-gian-cua-minh-rkOoPBzlo0eL",
  "Mot-buoi-nhau-o-cong-ty-pA76EBZ6Cfz5",
  "JEFFREY-DAHMER-NGUYEN-NHAN-DANG-SAU-NHUNG-TOI-AC-KINH-HOANG-NUP-BONG-TINH-YEU-EBJhMa3jfTUj",
  "Loi-song-nao-khien-ban-theo-duoi-SRhCTXufLcPj",
  "4-BUOC-SIEU-HUU-ICH-GIUP-DAN-CONTENT-TRAI-NGANH-PHAT-TRIEN-NHANH-CHONG-NHAT-xc3uVBrnsNg6",
  "Jeanne-dArc-Thanh-Nu-tren-gian-thieu-Tu84bZoGck90",
  "CAN-THAN-NHUNG-CONG-VIEC-KHONG-CO-JOB-DESCRIPTION-RO-RANG-TIAk6TqcOViB",
  "Cach-trinh-bay-bao-cao-tren-Excel-sao-cho-ngau-uEl8rjUZtIpT",
  "9-cau-hoi-ve-cuoc-doi-bi-an-cua-Baird-T-Spalding-BSelv8wQ17Cd",
  "TUONG-LAI-CUA-NGANH-DATA-ANALYST-RFcKZWxVFPmS",
  "SPOILER-Danh-gia-ve-tap-9-season-1-cua-House-of-the-Dragon-Q9ISDo4qPvkn",
  "SAN-HOC-BONG-DU-HOC-BAN-CUNG-CO-THE-LAM-DUOC-NEU-TIM-HIEU-TU-SOM-JmJkcl1shWMW",
  "Su-menh-bi-ap-dat-nfc6DX514dPr",
  "Thiet-ke-cuoc-song-dua-tren-su-ket-noi-phan-2-JR7Vodtm6HZ1",
  "Drifting-Home-2022-XUAT-SAC-NHUNG-CHUA-THAT-SU-NOI-BAT-Am7Ky8KYClzO",
  "SU-VO-DINH-CUA-NEN-GIAO-DUC-GX3tqgQ8FOHx",
  "Ban-khong-he-lac-loi-nhu-ban-nghi-dau-cqKpSBCHMxDX",
  "LAM-GI-KHI-MAC-KET-VOI-MOT-KE-THAO-TUNG-TAM-LY-AmwAMG8emctx",
  "NEU-TA-DUOC-SONG-TRONG-MOT-THE-GIOI-KHONG-GIOI-HAN-KBWhNcNwd7Kw",
  "Co-phai-hanh-kinh-la-dang-thanh-loc-giai-doc-co-the-cua-ban-Kmliv1oqsW8k",
  "REPORT-BUILDER-and-DATA-ANALYST-Ban-la-ai-ZH8jQREGYzdb",
  "Day-som-de-thanh-cong-va-nhung-dieu-ban-chua-biet-WXguw76a6SjU",
  "Du-trend-co-ryp-to-duoc-an-ca-hay-nga-ve-khong-pBjX07cRh3S7",
  "Muon-dong-vai-nan-nhan-u-Hay-xem-minh-la-nguoi-co-loi-truoc-4mkuhpDO0IdQ",
  "Review-phim-rap-Co-nen-di-xem-Co-Gai-Tu-Qua-Khu-kV8d11iHqYGM",
  "Du-lich-mot-minh-pho-bien-hon-sau-dai-dich-Covid-19-md7KotksxedZ",
  "Vi-sao-tam-ly-ngan-han-se-khien-ban-lien-tuc-mat-tien-va-vi-sao-tam-ly-dai-han-la-bai-hoc-quan-trong-nhat-trong-dau-tu-DnNVgFPmF6hF",
  "Lang-nhin-cuoc-song-thau-hieu-nhung-tam-hon-sau-bao-giong-6i9ltrX1VSse",
  "Nghien-xem-p0rn-va-nghien-thu-dam-Lam-sao-de-cai-hwaCBPRQKuuV",
  "6-ly-do-ban-nen-tham-gia-cac-hoat-dong-ngoai-khoa-tu-khi-con-di-hoc-FJbJXZnQzonG",
  "Phim-Tang-ban-mot-doa-hoa-do-nho-w6uEMHgxxi7k",
];

const buildArticle = (post) => {
  return {
    title: post.title,
    description: post.description,
    tagList: post.tags.map((tag) => tag.name),
    blocks: post.body.blocks.map((block) => ({
      type: block.type,
      data: {
        alignment: block.data?.alignment,
        text: block.data?.text,
        caption: block.data?.caption,
        file: {
          url: block.data?.file?.url,
          info: {
            width: block.data?.file?.info?.width,
            height: block.data?.file?.info?.height,
          },
        },
      },
    })),
  };
};

const fetchPost = async (slug) => {
  const response = (
    await fetch(`https://spiderum.com/api/v1/post/${slug}`)
  ).json();
  return response;
};

const final = async () => {
  const list = [];

  for (const slug of slugList) {
    const { post } = await fetchPost(slug);
    const article = buildArticle(post);
    list.push(article);
  }

  console.log({ list });
  return list;
};

final();
