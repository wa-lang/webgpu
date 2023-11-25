canvas: new function() {
  this.get_context2d = (h) => {
    if (h == 0) return 0;

    const canvas = app._extobj.get_obj(h);
    const ctx = canvas.getContext("2d");
    if (ctx) {
      return app._extobj.insert_obj(ctx);
    }

    return 0;
  }

  app._canvas = this;
},