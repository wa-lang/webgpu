
webgpu: new function () {
  this._texture_format_map = new Map([
    ["r8unorm", 0],
    ["r8snorm", 1],
    ["r8uint", 2],
    ["r8sint", 3],
    ["r16uint", 4],
    ["r16sint", 5],
    ["r16float", 6],
    ["rg8unorm", 7],
    ["rg8snorm", 8],
    ["rg8uint", 9],
    ["rg8sint", 10],
    ["r32uint", 11],
    ["r32sint", 12],
    ["r32float", 13],
    ["rg16uint", 14],
    ["rg16sint", 15],
    ["rg16float", 16],
    ["rgba8unorm", 17],
    ["rgba8unorm-srgb", 18],
    ["rgba8snorm", 19],
    ["rgba8uint", 20],
    ["rgba8sint", 21],
    ["bgra8unorm", 22],
    ["bgra8unorm-srgb", 23],
    ["rgb9e5ufloat", 24],
    ["rgb10a2uint", 25],
    ["rgb10a2unorm", 26],
    ["rg11b10ufloat", 27],
    ["rg32uint", 28],
    ["rg32sint", 29],
    ["rg32float", 30],
    ["rgba16uint", 31],
    ["rgba16sint", 32],
    ["rgba16float", 33],
    ["rgba32uint", 34],
    ["rgba32sint", 35],
    ["rgba32float", 36],
    ["stencil8", 37],
    ["depth16unorm", 38],
    ["depth24plus", 39],
    ["depth24plus-stencil8", 40],
    ["depth32float", 41],
    ["depth32float-stencil8", 42],
    ["bc1-rgba-unorm", 43],
    ["bc1-rgba-unorm-srgb", 44],
    ["bc2-rgba-unorm", 45],
    ["bc2-rgba-unorm-srgb", 46],
    ["bc3-rgba-unorm", 47],
    ["bc3-rgba-unorm-srgb", 48],
    ["bc4-r-unorm", 49],
    ["bc4-r-snorm", 50],
    ["bc5-rg-unorm", 51],
    ["bc5-rg-snorm", 52],
    ["bc6h-rgb-ufloat", 53],
    ["bc6h-rgb-float", 54],
    ["bc7-rgba-unorm", 55],
    ["bc7-rgba-unorm-srgb", 56],
    ["etc2-rgb8unorm", 57],
    ["etc2-rgb8unorm-srgb", 58],
    ["etc2-rgb8a1unorm", 59],
    ["etc2-rgb8a1unorm-srgb", 60],
    ["etc2-rgba8unorm", 61],
    ["etc2-rgba8unorm-srgb", 62],
    ["eac-r11unorm", 63],
    ["eac-r11snorm", 64],
    ["eac-rg11unorm", 65],
    ["eac-rg11snorm", 66],
    ["astc-4x4-unorm", 67],
    ["astc-4x4-unorm-srgb", 68],
    ["astc-5x4-unorm", 69],
    ["astc-5x4-unorm-srgb", 70],
    ["astc-5x5-unorm", 71],
    ["astc-5x5-unorm-srgb", 72],
    ["astc-6x5-unorm", 73],
    ["astc-6x5-unorm-srgb", 74],
    ["astc-6x6-unorm", 75],
    ["astc-6x6-unorm-srgb", 76],
    ["astc-8x5-unorm", 77],
    ["astc-8x5-unorm-srgb", 78],
    ["astc-8x6-unorm", 79],
    ["astc-8x6-unorm-srgb", 80],
    ["astc-8x8-unorm", 81],
    ["astc-8x8-unorm-srgb", 82],
    ["astc-10x5-unorm", 83],
    ["astc-10x5-unorm-srgb", 84],
    ["astc-10x6-unorm", 85],
    ["astc-10x6-unorm-srgb", 86],
    ["astc-10x8-unorm", 87],
    ["astc-10x8-unorm-srgb", 88],
    ["astc-10x10-unorm", 89],
    ["astc-10x10-unorm-srgb", 90],
    ["astc-12x10-unorm", 91],
    ["astc-12x10-unorm-srgb", 92],
    ["astc-12x12-unorm", 93],
    ["astc-12x12-unorm-srgb", 94],
  ])

  this.get_gpu_contex = (canvas_h) => {
    const canvas = app._extobj.get_obj(canvas_h);
    const ctx = canvas.getContext('webgpu');
    return app._extobj.insert_obj(ctx);
  }

  this.configure_contex = (contex_h, config_h) => {
    const contex = app._extobj.get_obj(contex_h);
    const config = app._extobj.get_obj(config_h);
    contex.configure(config);
  }

  this.get_contex_current_texture = (contex) => {
    let texture = app._extobj.get_obj(contex).getCurrentTexture();
    return app._extobj.insert_obj(texture)
  }

  this.create_device = () => {
    if (!navigator.gpu) {
      alert('WebGPU not supported.');
      throw Error('WebGPU not supported.');
    }

    let h = app._extobj.insert_obj({});
    navigator.gpu.requestAdapter().then((adapter) => {
      if (!adapter) {
        alert('Couldn\'t request WebGPU adapter.');
        throw Error('Couldn\'t request WebGPU adapter.');
      }
      return adapter.requestDevice()
    }).then((device) => {
      device._wa_ready = true;
      app._extobj.set_obj(h, device);
    })

    return h
  }

  this.device_ready = (device) => {
    if (device === 0) {
      return 0
    }
    let obj = app._extobj.get_obj(device);
    if (obj._wa_ready) {
      return 1
    } else {
      return 0
    }
  }

  this.create_shader_module = (device, shader_code_b, shader_code_d, shader_code_l) => {
    const shader_code = app._mem_util.get_string(shader_code_d, shader_code_l)
    let shader = app._extobj.get_obj(device).createShaderModule({
      code: shader_code
    });
    return app._extobj.insert_obj(shader);
  }

  this.create_buffer = (device, byteLen, usage) => {
    let buffer = app._extobj.get_obj(device).createBuffer({
      size: byteLen,
      usage: usage,
    });
    return app._extobj.insert_obj(buffer);
  }

  this.create_texture = (device, desc) => {
    let texture = app._extobj.get_obj(device).createTexture(app._extobj.get_obj(desc));
    return app._extobj.insert_obj(texture);
  }

  this.create_sampler = (device, dh) => {
    const desc = app._extobj.get_obj(dh)
    let sampler = app._extobj.get_obj(device).createSampler(desc);
    return app._extobj.insert_obj(sampler);
  }

  this.copy_external_image_to_texture = (dh, src, dest) => {
    const device = app._extobj.get_obj(dh);
    const imageBitmap = app._extobj.get_obj(src);
    const tex = app._extobj.get_obj(dest);
    device.queue.copyExternalImageToTexture(
      { source: imageBitmap },
      { texture: tex },
      [imageBitmap.width, imageBitmap.height]
    );
  }

  this.create_render_pipeline = (device, pl_desc) => {
    let pipeline = app._extobj.get_obj(device).createRenderPipeline(app._extobj.get_obj(pl_desc));
    return app._extobj.insert_obj(pipeline);
  }

  this.create_bind_group = (device, bg_desc) => {
    let bind_group = app._extobj.get_obj(device).createBindGroup(app._extobj.get_obj(bg_desc));
    return app._extobj.insert_obj(bind_group);
  }

  this.get_bind_group_layout = (pipeline, id) => {
    let layout = app._extobj.get_obj(pipeline).getBindGroupLayout(id);
    return app._extobj.insert_obj(layout);
  }

  this.create_command_encoder = (device) => {
    let encoder = app._extobj.get_obj(device).createCommandEncoder();
    return app._extobj.insert_obj(encoder);
  }

  this.create_render_bundle_encoder = (device, desc) => {
    let rb_encoder = app._extobj.get_obj(device).createRenderBundleEncoder(app._extobj.get_obj(desc));
    return app._extobj.insert_obj(rb_encoder);
  }

  this.submit = (device_h, command_buffer_h) => {
    const device = app._extobj.get_obj(device_h);
    const command_buffer = app._extobj.get_obj(command_buffer_h);
    device.queue.submit([command_buffer]);
  }

  this.finish_command_encoder = (command_encoder_h) => {
    const command_encoder = app._extobj.get_obj(command_encoder_h);
    const command_buffer = command_encoder.finish();
    return app._extobj.insert_obj(command_buffer);
  }

  this.begin_render_pass = (command_encoder, render_pass_desc) => {
    let render_pass = app._extobj.get_obj(command_encoder).beginRenderPass(app._extobj.get_obj(render_pass_desc));
    return app._extobj.insert_obj(render_pass);
  }

  this.set_render_pass_pipeline = (render_pass, pipeline) => {
    app._extobj.get_obj(render_pass).setPipeline(app._extobj.get_obj(pipeline));
  }

  this.set_render_pass_bind_group = (render_pass, id, bg) => {
    app._extobj.get_obj(render_pass).setBindGroup(id, app._extobj.get_obj(bg))
  }

  this.set_render_pass_vertex_buffer = (render_pass, slot, buffer) => {
    app._extobj.get_obj(render_pass).setVertexBuffer(slot, app._extobj.get_obj(buffer));
  }

  this.set_render_pass_index_buffer = (render_pass, buffer, typ_b, typ_d, typ_l) => {
    const typ = app._mem_util.get_string(typ_d, typ_l);
    app._extobj.get_obj(render_pass).setIndexBuffer(app._extobj.get_obj(buffer), typ);
  }

  this.draw_render_pass = (render_pass, vertex_count) => {
    app._extobj.get_obj(render_pass).draw(vertex_count);
  }

  this.render_pass_draw_indexed = (render_pass, index_count) => {
    app._extobj.get_obj(render_pass).drawIndexed(index_count);
  }

  this.pass_encoder_execute_bundles = (pass_encoder, render_bundles) => {
    app._extobj.get_obj(pass_encoder).executeBundles(app._extobj.get_obj(render_bundles));
  }

  this.end_render_pass = (render_pass) => {
    app._extobj.get_obj(render_pass).end()
  }

  this.render_bundle_encoder_finish = (encoder) => {
    let bundle = app._extobj.get_obj(encoder).finish();
    return app._extobj.insert_obj(bundle);
  }

  this.write_buffer = (device_h, buffer_h, offset, data_b, data_d, data_l, data_c) => {
    const device = app._extobj.get_obj(device_h);
    const buffer = app._extobj.get_obj(buffer_h);
    const data = app._mem_util.mem_array_u8(data_d, data_l);
    device.queue.writeBuffer(buffer, offset, data)
  }

  this.create_texture_view = (texture) => {
    let view = app._extobj.get_obj(texture).createView();
    return app._extobj.insert_obj(view);
  }

  this.get_preferred_canvas_format = () => {
    return this._texture_format_map.get(navigator.gpu.getPreferredCanvasFormat());
  }
},
