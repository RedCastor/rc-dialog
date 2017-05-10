# rc-dialog

Angular Directive Modal Wrapper for "Bootstrap", "Foundation" and "ngDialog". 

**[Demo Bootstrap 3][]**

**[Demo Foundation 6][]**

Basic usage
---------------
Install bower package:
```bash
bower install rc-dialog --save
```

```javascript
angular('yourAngularApp',['rcDialog', 'ngDialog', 'ui.bootstrap', 'mm.foundation', 'ngAnimate']);
```

<h4>Parameters</h4>

- **rcd-open** = Directive. You can add value "bootstrap" or "foundation". no value is for ngDialog.
- **rcd-template** = String of the modal content.
- **rcd-template-url** = Url template of the modal content.
- **rcd-size** = "tiny", "small", "large", "full".
- **rcd-animation** = boolean active the animation.
- **rcd-backdrop** = boolean active the backdrop.
- **rcd-esc-close** = boolean active key esc for close.
- **rcd-click-close** = boolean active click outside modal for close.
- **rcd-auto-close** = Delay auto modal close after open in milisecond.
- **rcd-class** = Add extra class to modal .
- **rcd-selected-view** = set the default view string. Default empty string. Possible to use in url with location search = "selectedView=myCurrentView".
- **rcd-data** = Pass data to modal content. 
  Access in your template with "rcDialogApi.data". 
  Access to your params modal in template with "rcDialogApi.dialog"


<h4>Usage/Example</h4>

```html
<!-- Bootstrap -->
<script type="text/ng-template" id="templateBootstrapId.html">
    <div class="modal-header">
        <button type="button" data-ng-click="rcDialogApi.closeDialog()" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <h3 class="modal-title">Bootstrap Modal</h3>
    </div>
    <div class="modal-body">
        <p>This is the content of the template for angular bootstrap</p>
        <p>{{rcDialogApi.dialog}}</p>
        <p>{{rcDialogApi.data}}</p>
    </div>
</script>
<button type="button" class="btn btn-warning btn-block" 
    rcd-data="{'urlApi':'http://api.com'}" 
    rcd-open="bootstrap" 
    rcd-template-url="templateBootstrapId.html" 
    rcd-backdrop="true"
>Open Modal Bootstrap</button>
```

```html
<!-- Foundation -->
<script type="text/ng-template" id="templateFoundationId.html">
    <div class="modal-header">
        <button type="button" data-ng-click="rcDialogApi.closeDialog()" class="close-button" aria-label="Close reveal" >
            <span aria-hidden="true">&times;</span>
        </button>
        <h3 class="modal-title">Foundation Modal</h3>
    </div>
    <div class="modal-body">
        <p>This is the content of the template for angular foundation</p>
        <p>{{rcDialogApi.dialog}}</p>
        <p>{{rcDialogApi.data}}</p>
    </div>
</script>
<button type="button" class="button warning expanded" 
    rcd-data="{'urlApi':'http://api.com'}" 
    rcd-open="foundation" 
    rcd-template-url="templateFoundationId.html" 
    rcd-backdrop="true"
>Open Modal Foundation</button>
```

```html
<!-- ngDialog -->
<script type="text/ng-template" id="templateId.html">
    <h3>ngDialog Modal</h3>
    <p>This is the content of the template for ngDialog</p>
    <p>{{rcDialogApi.dialog}}</p>
    <p>{{rcDialogApi.data}}</p>
</script>
<button type="button" class="button primary expanded" 
    rcd-data="{'urlApi':'http://api.com'}" 
    rcd-open 
    rcd-template-url="templateId.html" 
    rcd-backdrop="true"
>Open ngDialog</button>
```


[Demo Bootstrap 3]: http://redcastor.github.io/rc-dialog/demo/bs/
[Demo Foundation 6]: http://redcastor.github.io/rc-dialog/demo/zf/
