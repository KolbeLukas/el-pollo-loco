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

   /**
    * getting informations if an certain key is preesed and what is happening than
    */
   keyEvent() {
      window.addEventListener('keydown', e => {
         if (e.key == 'ArrowRight' && !this.M) {
            this.RIGHT = true;
            document.getElementById('btn-right').classList.add('hud-btn-pressed');
         }
         if (e.key == 'ArrowLeft' && !this.M) {
            this.LEFT = true;
            document.getElementById('btn-left').classList.add('hud-btn-pressed');
         }
         if (e.key == ' ' && !this.M) {
            this.SPACE = true;
            document.getElementById('btn-jump').classList.add('hud-btn-pressed');
         }
         if (e.key == 'd' && !this.M) {
            this.D = true;
            document.getElementById('btn-throw').classList.add('hud-btn-pressed');
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
            document.getElementById('btn-right').classList.remove('hud-btn-pressed');
         }
         if (e.key == 'ArrowLeft') {
            this.LEFT = false;
            document.getElementById('btn-left').classList.remove('hud-btn-pressed');
         }
         if (e.key == ' ') {
            this.SPACE = false;
            document.getElementById('btn-jump').classList.remove('hud-btn-pressed');
         }
         if (e.key == 'd') {
            this.D = false;
            document.getElementById('btn-throw').classList.remove('hud-btn-pressed');
         }
      });
   }

   /**
    * getting informations if an certain mobile button is preesed and what is happening than
    */
   btnPressEvent() {
      document.getElementById('btn-right').addEventListener('touchstart', () => {
         this.RIGHT = true;
         document.getElementById('btn-right').classList.add('hud-btn-pressed');
      });

      document.getElementById('btn-right').addEventListener('touchend', () => {
         this.RIGHT = false;
         document.getElementById('btn-right').classList.remove('hud-btn-pressed');
      });

      document.getElementById('btn-left').addEventListener('touchstart', () => {
         this.LEFT = true;
         document.getElementById('btn-left').classList.add('hud-btn-pressed');
      });

      document.getElementById('btn-left').addEventListener('touchend', () => {
         this.LEFT = false;
         document.getElementById('btn-left').classList.remove('hud-btn-pressed');
      });

      document.getElementById('btn-jump').addEventListener('touchstart', () => {
         this.SPACE = true;
         document.getElementById('btn-jump').classList.add('hud-btn-pressed');
      });

      document.getElementById('btn-jump').addEventListener('touchend', () => {
         this.SPACE = false;
         document.getElementById('btn-jump').classList.remove('hud-btn-pressed');
      });

      document.getElementById('btn-throw').addEventListener('touchstart', () => {
         this.D = true;
         document.getElementById('btn-throw').classList.add('hud-btn-pressed');
      });

      document.getElementById('btn-throw').addEventListener('touchend', () => {
         this.D = false;
         document.getElementById('btn-throw').classList.remove('hud-btn-pressed');
      });
   }
}