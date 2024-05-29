class LangController {
  changeLocale(req, res, next) {
    const locale = req.params.locale;

    res.cookie("nodepop-language", locale, {
      maxAge: 1000 * 60 * 60 * 24 * 20,
    });

    res.redirect("back");
  }
}

module.exports = LangController;
