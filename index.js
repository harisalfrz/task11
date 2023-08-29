const express = require("express");
const app = express();
const PORT = 5000;
const path = require("path");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

// Asset Files
app.use(express.static('src/assets'))
app.use(express.urlencoded({ extended: false }));

const contentBlog = [
  {
    projectName: "Vue JS",
    authorName: "Haris Alfariz",
    postedAt: getFullTime(new Date()),
    startDate: "2023-06-01",
    endDate: "2023-08-20",
    description:
      "Vue.js adalah framework JavaScript yang bisa digunakan untuk mengembangkan aplikasi. Biasanya, framework ini digunakan untuk dua hal, yaitu membangun User Interface (UI) dan Single Page Application (SPA). Bisa dibilang, Vue.js adalah salah satu framework yang cukup populer.",
    inputNodejs: "",
    inputReactjs: "",
    inputVuejs: "on",
    inputJavascript: "",
    inputImg: "/images/vuejs.jpg",
  },
  {
    projectName: "Keyboard Mechanical",
    authorName: "Haris Alfariz",
    postedAt: getFullTime(new Date()),
    startDate: "2023-06-08",
    endDate: "2023-08-08",
    description:
      "  Keyboard mechanical adalah keyboard yang awet, berkualitas, dan nyaman digunakan sehingga cocok untuk bekerja atau bermain game.",
    inputNodejs: "on",
    inputReactjs: "on",
    inputVuejs: "on",
    inputJavascript: "on",
    inputImg:
      "/images/keyboard-mechanical.jpg",
  },
  {
    projectName: "Type Script",
    authorName: "Haris Alfariz",
    postedAt: getFullTime(new Date()),
    startDate: "2022-05-01",
    endDate: "2023-08-20",
    description:
      "TypeScript adalah bahasa pemrograman open source yang dibangun di atas JavaScript.",
    inputNodejs: "on",
    inputReactjs: "on",
    inputVuejs: "",
    inputJavascript: "on",
    inputImg:
      "/images/typescript-icon-512x512-we5ze0xe.png",
  },
  
];

app.get("/", (req, res) => {
  res.render("index", { contentBlog });
});

app.get("/form-blog", (req, res) => {
  res.render("form-blog");
});

app.post("/form-blog", (req, res) => {
  const {
    projectName,
    authorName,
    startDate,
    endDate,
    description,
    inputNodejs,
    inputReactjs,
    inputVuejs,
    inputJavascript,
  } = req.body;

  const durasi = getDurasi(startDate, endDate);

  const content = {
    projectName,
    authorName,
    postedAt: getFullTime(new Date()),
    startDate,
    endDate,
    description,
    inputNodejs,
    inputReactjs,
    inputVuejs,
    inputJavascript,
    durasi,
  };

  contentBlog.push(content);
  content.ids = contentBlog.length - 1;
  
  res.redirect("/");
});

app.get("/update-project/:id", (req, res) => {
  const id = req.params.id;

  res.render("update-project", { data: contentBlog[id] });
});

app.post("/update-project/:id", (req, res) => {
  
  let editURL = req.originalUrl;
  console.log(editURL);

  const {
    ids,
    projectName,
    authorName,
    startDate,
    endDate,
    description,
    inputNodejs,
    inputReactjs,
    inputVuejs,
    inputJavascript,
    inputImg,
  } = req.body;

  const durasi = getDurasi(startDate, endDate);

  const content = {
    ids,
    projectName,
    authorName,
    postedAt: getFullTime(new Date()),
    startDate,
    endDate,
    description,
    inputNodejs,
    inputReactjs,
    inputVuejs,
    inputJavascript,
    inputImg,
    durasi,
  };
  console.log(content);

  contentBlog.splice(ids, 1, content);
  res.redirect("/");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/blog-content/:id", (req, res) => {
  const id = req.params.id;

  res.render("blog-content", { data: contentBlog[id] });
});

app.get("/delete-blog/:id", (req, res) => {
  const id = req.params.id;

  contentBlog.splice(id, 1);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Functions
contentBlog.forEach((blog, index) => {
  blog.durasi = getDurasi(blog.startDate, blog.endDate);
  blog.ids = index;
});

function getDurasi(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDifference = end - start;
  const durationInDays = Math.floor(timeDifference / (1000 * 3600 * 24));
  let daysInMonth = 30;
  let monthsInYear = 12;
  let durasiMonth = Math.floor(durationInDays / daysInMonth);
  let durasiYear = Math.floor(durationInDays / (daysInMonth * monthsInYear));

  if (durasiYear > 0) {
    return `Durasi: ${durasiYear} tahun`;
  } else if (durasiMonth > 0) {
    return `Durasi: ${durasiMonth} bulan`;
  } else if (durationInDays > 0) {
    return `Durasi: ${durationInDays} hari`;
  } else {
    return "";
  }
}

function getFullTime(time) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(time);
}