<template>
  <div
    id="dashProductModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="exampleModalLabel" class="modal-title">
            <span>Product's detail</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label for="image">Enter image URL</label>
                <input
                  id="image"
                  v-model="tempProduct.imageUrl"
                  type="text"
                  class="form-control"
                  placeholder="please enter image URL here"
                />
              </div>
              <div class="form-group">
                <label for="customFile">
                  Or Upload image
                  <i v-if="fileIsUploading" class="fas fa-spinner fa-spin"></i>
                </label>

                <input
                  id="customFile"
                  ref="files"
                  type="file"
                  class="form-control"
                  @change="uploadFile"
                />
              </div>
              <img
                img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                class="img-fluid"
                :src="tempProduct.imageUrl"
                alt
              />
            </div>
            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">Title</label>
                <input
                  id="title"
                  v-model="tempProduct.title"
                  type="text"
                  class="form-control"
                  placeholder="Please enter product's name"
                />
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="category">Category</label>
                  <input
                    id="category"
                    v-model="tempProduct.category"
                    type="text"
                    class="form-control"
                    placeholder="Please enter category"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price">Unit</label>
                  <input
                    id="unit"
                    v-model="tempProduct.unit"
                    type="unit"
                    class="form-control"
                    placeholder="Please enter a quantifier"
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="origin_price">Was</label>
                  <input
                    id="origin_price"
                    v-model="tempProduct.origin_price"
                    type="number"
                    class="form-control"
                    placeholder="Please enter original price "
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price">Price</label>
                  <input
                    id="price"
                    v-model="tempProduct.price"
                    type="number"
                    class="form-control"
                    placeholder="Please enter current price"
                  />
                </div>
              </div>
              <hr />

              <div class="form-group">
                <label for="description">Description</label>
                <textarea
                  id="description"
                  v-model="tempProduct.description"
                  type="text"
                  class="form-control"
                  placeholder="Please enter description"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="content">Detail</label>
                <textarea
                  id="content"
                  v-model="tempProduct.content"
                  type="text"
                  class="form-control"
                  placeholder="Please enter content of the product"
                ></textarea>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    v-model="tempProduct.is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled">Enabled</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="updateProduct(tempProduct)"
          >Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { IProduct } from 'models/product'
import { adminModule } from '../../../../store'

@Component
export default class ProductModal extends Vue {
  get tempProduct() {
    return adminModule.tempProduct
  }

  get fileIsUploading() {
    return adminModule.fileIsUploading
  }

  updateProduct(tempProduct: IProduct) {
    adminModule.updateProduct(tempProduct)
    ;($('#dashProductModal') as any).modal('hide')
  }

  uploadFile() {
    // const uploadedFile = this.$refs.files.files[0]
    const uploadedFile = ((this.$refs.files as Vue)
      .$el as HTMLInputElement).files![0]

    adminModule.uploadFile(uploadedFile)
  }
}
</script>
