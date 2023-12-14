gpu_sample: new function() {
    this.get_image_bitmap = (id) => {
      return app._extobj.insert_obj(window._img_bitmap[id]);
  }
},