class Keyboard {
   LEFT = false;
   RIGHT = false;
   SPACE = false;
   D = false;
   M = false;

   constructor() {
      this.keyEvent();
      this.btnPressEvent();
   }


   keyEvent() {
      window.addEventListener('keydown', e => {
         if (e.key == 'ArrowRight' && !this.M) {
            this.RIGHT = true;
         }
         if (e.key == 'ArrowLeft' && !this.M) {
            this.LEFT = true;
         }
         if (e.key == ' ' && !this.M) {
            this.SPACE = true;
         }
         if (e.key == 'd' && !this.M) {
            this.D = true;
         }
         if (e.key == 'm') {
            if (document.getElementById('menu-overlay').classList.contains('d-none')) {
               this.M = document.getElementById('menu-overlay').classList.remove('d-none');
               this.M = true;
            } else {
               this.M = document.getElementById('menu-overlay').classList.add('d-none');
               this.M = false;
            }
         }
      });

      window.addEventListener('keyup', e => {
         if (e.key == 'ArrowRight') {
            this.RIGHT = false;
         }
         if (e.key == 'ArrowLeft') {
            this.LEFT = false;
         }
         if (e.key == ' ') {
            this.SPACE = false;
         }
         if (e.key == 'd') {
            this.D = false;
         }
      });
   }

   btnPressEvent() {
      document.getElementById('btn-right').addEventListener('touchstart', () => {
         this.RIGHT = true;
      });

      document.getElementById('btn-right').addEventListener('touchend', () => {
         this.RIGHT = false;
      });

      document.getElementById('btn-left').addEventListener('touchstart', () => {
         this.LEFT = true;
      });

      document.getElementById('btn-left').addEventListener('touchend', () => {
         this.LEFT = false;
      });

      document.getElementById('btn-jump').addEventListener('touchstart', () => {
         this.SPACE = true;
      });

      document.getElementById('btn-jump').addEventListener('touchend', () => {
         this.SPACE = false;
      });

      document.getElementById('btn-throw').addEventListener('touchstart', () => {
         this.D = true;
      });

      document.getElementById('btn-throw').addEventListener('touchend', () => {
         this.D = false;
      });
   }
}