const { Router } = require("express");
const express = require("express");

const dictionaryRouter = require("./dictionary.routes");
const categoryRouter = require("./category.routes");
const descRouter = require("./description.routes");
const authorRouter = require("./author.routes");
const adminRouter = require("./admin.routes");
const userRouter = require("./user.routes");

express.Router.prefix = function (path, subRouter) {
  const router = express.Router();
  this.use(path, router);
  subRouter(router);
  return router;
};

const router = Router();
router.prefix("/api", (apiRouter) => {
  apiRouter.use("/term", dictionaryRouter);
  apiRouter.use("/category", categoryRouter);
  apiRouter.use("/description", descRouter);
  apiRouter.use("/author", authorRouter);
  apiRouter.use("/admin", adminRouter);
  apiRouter.use("/user", userRouter);
});

module.exports = router;
