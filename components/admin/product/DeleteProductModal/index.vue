<template>
  <div
    id="delProductModal"
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="exampleModalLabel" class="modal-title">
            <span>Delete Product</span>
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Are you sure you want to delete
          <strong class="text-danger">{{ del.title }}</strong>
          ? (Can't recover after deleted)
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-dismiss="modal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="deleteProduct(del.id)"
          >
            Confirm deletion
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import $ from 'jquery'
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { adminModule } from '../../../../store'

@Component
export default class DeleteProductModal extends Vue {
  @Prop({ required: true }) readonly del!: {
    id: string
    title: string
  }

  deleteProduct(id: string) {
    adminModule.deleteProduct(id)
    ;($('#delProductModal') as any).modal('hide')
  }
}
</script>
