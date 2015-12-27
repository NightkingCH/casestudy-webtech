import { Component } from 'angular2/core';

@Component({
    selector: '[data-footer]',
    template: `
    <footer class="footer">
		<div class="footer-info">
			<div class="container">
					<div class="col-md-2 col-sm-6">
						<h5>Information</h5>
						<ul>
							<li><a href="about.html">About Us</a></li>
							<li><a href="#">Delivery Information</a></li>
							<li><a href="#">Privacy Policy</a></li>
							<li><a href="#">Terms &amp; Conditions</a></li>
						</ul>
					</div>
					<div class="clearfix visible-sm"></div>
					<div class="col-md-2 col-sm-6">
						<h5>Service</h5>
						<ul>
							<li><a href="contact.html">Contact Us</a></li>
						</ul>
					</div>
					<div class="col-md-2 col-sm-6">
						<h5>Follow Us</h5>
						<ul>
							<li><a href="#">Facebook</a></li>
							<li><a href="#">Twitter</a></li>
						</ul>
					</div>
					<div class="col-md-4 col-sm-12 last">
						<h5>Contact Us</h5>
						<ul>
							<li>My Company</li>
							<li>
								1247 LB Nagar Road, Hyderabad, Telangana - 35
							</li>
							<li>
								Email: <a href="#">info@demolink.com</a>
							</li>								
						</ul>
						<h4 class="lead">
							Tel: <span>1(234) 567-9842</span>
						</h4>
					</div>
			</div>
		</div>
		<div class="footer-copyright">
			<div class="container">
				<p class="pull-left">
					© 2015 Buchhaus. Designed By <a href="http://cotspheer.rocks">Cotspheer</a>
				</p>
			</div>
		</div>
	</footer>
    `
})
export class FooterComponent {
}
