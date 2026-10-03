(function() {
  var cartContainer = document.getElementById("CartContainer");
  var checkouts = document.getElementsByClassName('order-summary__section--discount')
  var checkout = checkouts[checkouts.length - 1];

  var idme = `<div class="idme">
    <div class="idme-shopify">
      <p class='idme-btn-affinity'>Military and First Responders receive a discount</p>
      <a class="idme-btn-unify" href="https://discountify.id.me/oauth/checkpoint/miadonna-2" >
        <img src="https://s3.amazonaws.com/idme/developer/idme-buttons/assets/img/verify.svg" alt="ID.me" style="height:42px"/>
      </a>
    </div>
  </div>`;


   checkout && checkout.insertAdjacentHTML("afterend", idme);
})();

