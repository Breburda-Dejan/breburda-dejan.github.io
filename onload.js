window.addEventListener('load', () => {
	anime({
		targets: '.scalechange',
		scale:[1.2, 1],
		opacity: [0.3, 1],
		easing: 'easeInExpo',
		duration: 800,
		complete: function(anim){
			animateParticles();
		}
	});
	
	anime({
		targets: '.section',
		translateY: 5,
		easing: 'easeOutExpo',
		duration: 500
	});

	anime({
		targets: '.skill-progress',
		width: (el) => [10,el.style.with],
		easing: 'easeInOutQuart',
		delay: anime.stagger(100),
		duration: 1500
	});
});